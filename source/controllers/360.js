import standardDPad from "./functions/standardDPad"
import standardStick from "./functions/standardStick"


export default {
	match: /(XInput STANDARD GAMEPAD|Xbox 360.*Controller)/i,
	type: "xbox 360",
	buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start"],
	standardDPads: [[14, 12, 15, 13]],
	init: luxController => {
		const sticks = []
		Object.defineProperty(sticks, 0, { get: standardStick(luxController, 0, 1, 10) })
		Object.defineProperty(sticks, 1, { get: standardStick(luxController, 2, 3, 11) })
		Object.defineProperty(luxController, 'dPad', {get: standardAxesDPad})
		luxController.sticks = sticks
	}
}
