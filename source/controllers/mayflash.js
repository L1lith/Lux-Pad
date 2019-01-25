import standardAxes from './functions/standardAxes'
const nunchuckDeadzone = 0.1
const wiiRemoteRegex = /Mayflash Wiimote/i

export default {
  match: wiiRemoteRegex,
  type: "wii remote",
  buttons: ["1","2","A","B","-","+",,,,,,"Home"],
  details: {
    manufacturer: "Mayflash"
  },
  init: (luxController, rawController, rawControllers) => {
    const wiiRemotes = [...rawControllers].filter(controller => controller && wiiRemoteRegex.test(controller.id))
    if (wiiRemotes.length === 4) {
      const playerNumber = 4 - wiiRemotes.indexOf(rawController)
      luxController.playerNumber = playerNumber
    } else {
      luxController.playerNumber = "unknown"
    }
    Object.defineProperty(nunChuck, 'Z', {get: ()=>(luxController.rawController.buttons[6].pressed)})
    Object.defineProperty(nunChuck, 'C', {get: ()=>(luxController.rawController.buttons[7].pressed)})
    luxController.nunchuckDeadzone = 0.1
    Object.defineProperty(nunchuck, 'stick', {get: standardAxes(luxController, 0, 1), writeable: false})
    luxController.aimDeadzone = 0.01
    Object.defineProperty(luxController, 'aim', {get: ()=>{
      let x = luxController.rawController.axes[2]
      let y = luxController.rawController.axes[5]
      let aiming = true
      if (Math.abs(x) < luxController.aimDeadzone) x = 0
      if (Math.abs(y) < luxController.aimDeadzone) y = 0
      if (x === 0 && y === 0) aiming = false
      return {x, y, aiming}
    }, writeable: false})
    luxController.nunchuck = nunchuck
    Object.defineProperty(luxController, 'dPad', {get: ()=>{
      let rawValue = luxController.rawController.axes[9]
      const absValue = Math.abs(rawValue)
      let x, y
      if (rawValue >= 1.01) return {x: 0, y: 0}
      // NOTE TO SELF: DIAGONAL INPUT DOESN'T WORK PROPERLY
      if (rawValue <= -0.99 || Math.abs(rawValue) <= 0.15) {
        x = 0
      } else if (rawValue > 0) {
        x = -1
      } else {
        x = 1
      }
      if (rawValue > 1.01 || Math.abs(absValue - 0.7) <= 0.1 || Math.abs(rawValue + 0.4) <= 0.1) {
        y = 0
      } else if (absValue > 0.5) {
        y = -1
      } else {
        y = 1
      }
      return {x, y}
    }, configurable: false})
  }
}
