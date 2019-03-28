import standardStick from "./functions/standardStick"
import standardAxesDPad from './functions/standardAxesDPad'

export default {
  match: /(Fight Pad Pro.*Nintendo Switch|Nintendo Switch.*Fight Pad Pro)/i,
  type: "nintendo switch gamecube pro",
  buttons: ["Y", "B", "A", "X", "L", "R", "ZL", "ZR", "-", "+", null, null, "HOME", "SCREENSHOT"],
  init: luxController => {
    const sticks = {}
		Object.defineProperty(sticks, 'left', { get: standardStick(luxController, 0, 1, 10) })
		Object.defineProperty(sticks, "c", { get: standardStick(luxController, 2, 6, 11) })
		luxController.sticks = sticks
    Object.defineProperty(luxController, "dPad", { get: standardAxesDPad(luxController, 9), configurable: false })
	}
}
