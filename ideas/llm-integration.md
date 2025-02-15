## AI Integration

## Idea

It would be incredibly useful to be able to retrieve Item Urls from an AI tool.

I've successfully done this by exporting and adding the inventory to a vector database. But clearly this is not an ideal solution for a inventory system that is constantly growing and changing. 

My plan for a proof of concept here involves connecting a local LLM to Homebox via its API.

This would entail figuring out the query logic. 

If this proof of concept is successful, the next question would be whether the approach can be used in a more production setting - perhaps adding a Homebox integration as a tool to something like Open Web UI so that cloud LLMs could be used for the same purpose.

## Use-Case

The type of use keys that I would find very helpful would be retrieval.  However, the usefulness of this would really depend on whether the item's API can return the parent items as well. 

For example, I might wish to prompt:

`Where can I find my printer cables?`

I'd like the AI to respond:

`Your USB type B cables are in box 11. Here's the link to the item [link]`

But in this case:

Item = USB printer cables
Parent item = Box 11