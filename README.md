# Lux Pad

Lux Pad contains mappings for controllers it uses to make working with controllers in the browser a breeze.

## Warning

Two Breaking Modifications have just been introduced (my apologies for all inconviences):

#### Node:

Instead of using

```js
import LuxPad from "lux-pad"
```

You must now use

```js
import { LuxPad } from "lux-pad"
```

#### Browser:

Lux Pad has just migrated the global browser variable name from LuxPad to simply Lux because since adding new imports to LuxPad the old name would cause issues when trying to do something like

```
const {LuxPad} = LuxPad
```

## Example

```js
import { LuxPad } from "lux-pad"
const Lux = new LuxPad()

const wiiRemote = Lux.findController({ type: "wii remote" }) // Find a single controller with matching properties
console.log(wiiRemote) /* Returns a LuxController structured like this
LuxController {
    type: "wii remote",
    buttons: {A: true, B: false, ...},
    nunchuk: {Z: true, C: false, stick {x: 0, y: 0.242341}},
    ...continued
}*/
const xboxControllers = Lux.findControllers({ type: "xbox 360" }) // Find all controllers with matching properties
console.log(xboxControllers)
```

## Supported Controllers

Currently Lux Pad supports the following controllers

```
Xbox 360
Mayflash Dolphinbar Wii Remote
Nintendo Switch Fight Pad Pro (Gamecube style Switch controller)
```

Feel free to contribute with pull requests to help us support more :blush:

## Unsupported Controllers

If a controller is unsupported the LuxController object's type will be `"unknown"`, but all controllers provide access to the raw controllers object via the `rawController` property which can be used directly.

## Usage in the Browser Without NPM

Simply download the [latest release](https://github.com/L1lith/Lux-Pad/releases/), include it in your static assets, then import it and the global Lux variable will be provided.
