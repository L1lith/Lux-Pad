# Lux Pad
Lux Pad contains mappings for controllers it uses to make working with controllers in the browser a breeze.

## Example
```js
import LuxPad from 'lux-pad'
const Lux = new LuxPad()

const wiiRemote = Lux.findController({type: "wii remote"})
console.log(wiiRemote) /* Returns a LuxController structured like this
LuxController {
    type: "wii remote",
    buttons: {A: true, B: false, ...},
    nunchuk: {Z: true, C: false, stick {x: 0, y: 0.242341}},
    ...continued
}
*/
```

## Supported Controllers
Currently Lux Pad supports the following controllers
```
Xbox 360
Mayflash Dolphinbar Wii Remote
```
Feel free to contribute with pull requests to help us support more :blush:

## Unsupported Controllers
If a controller is unsupported the LuxController object's type will be `"unknown"`, but all controllers provide access to the raw controllers object via the `rawController` property which can be used directly.
