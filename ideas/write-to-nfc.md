# Write To NFC Button 

## Idea

Homebox supports using QR codes for inventory management but does not support NFC tags (yet) which is a pity.

Currently in order to create NFC tags to track items, I need to (on Android):

- Navigate to the item  
- Copy its URL  
- Open NFC Tools Pro  
- Write the URL to the tag  
- Lock the tag  

Any way in which this process could be reduced to last steps would make it much quicker. 

## NFC Tag Script

One possible way to implement this would be allowing the user to save a custom NFC tag writing script in Homebox.

This might be something like a task or automation, and pressing the button would trigger their saved NFC script. 

This allows for customization, but is more complicated. 

## Write Tag Link

A simpler model would be using an intent prefix to the current (item) URL so that the user could click on it and "jump" directly to their NFC writer (on Android).

Doing this would involve seeing which URL associations, NFC Tools Pro has out of the box. And if there are none that would be suitable for mapping whether one can be created reasonably easily. 