#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const IDEAS_DIR = 'ideas';
const README_PATH = 'README.md';

async function extractBranchBadge(content) {
    const match = content.match(/\[!\[Branch:.*?\]\(.*?\)\]\(.*?\)/);
    return match ? match[0] : '';
}

async function getPrettifiedName(filename) {
    // Remove .md extension and convert to title case
    return filename
        .replace('.md', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function generateTable() {
    try {
        // Read all files in ideas directory
        const files = await fs.readdir(IDEAS_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        // Generate table rows
        const rows = await Promise.all(mdFiles.map(async file => {
            const content = await fs.readFile(path.join(IDEAS_DIR, file), 'utf8');
            const prettifiedName = await getPrettifiedName(file);
            const branchBadge = await extractBranchBadge(content);
            
            return {
                name: prettifiedName,
                link: `[${file}](${IDEAS_DIR}/${file})`,
                badge: branchBadge,
                originalName: file // for sorting
            };
        }));

        // Sort alphabetically
        rows.sort((a, b) => a.originalName.localeCompare(b.originalName));

        // Generate markdown table
        const tableHeader = '## Ideas Index\n\n| Idea | Link | Dev Branch |\n|------|------|------------|\n';
        const tableRows = rows.map(row => 
            `| ${row.name} | ${row.link} | ${row.badge} |`
        ).join('\n');

        const table = tableHeader + tableRows + '\n\n';

        // Read README.md
        const readme = await fs.readFile(README_PATH, 'utf8');

        // Replace or insert table
        const tableRegex = /## Ideas Index\n\n[\s\S]*?(?=##|$)/;
        const newReadme = readme.match(tableRegex) 
            ? readme.replace(tableRegex, table)
            : readme.replace('## My Fork And Branches', table + '## My Fork And Branches');

        // Write updated README
        await fs.writeFile(README_PATH, newReadme);
        console.log('Ideas index table has been updated in README.md');

    } catch (error) {
        console.error('Error generating ideas index:', error);
        process.exit(1);
    }
}

generateTable();