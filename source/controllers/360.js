import standardDPad from "./functions/standardDPad"

function stick(luxController, xAxes, yAxes, pressButton) {
	luxController.deadZone = 0.1
	return () => {
		const { axes, buttons } = luxController.rawController
		const { deadZone } = luxController
		let x = axes[xAxes]
		let y = axes[yAxes]
		if (Math.abs(x) <= deadZone) x = 0
		if (Math.abs(y) <= deadZone) y = 0
		const { pressed } = buttons[pressButton]
		return { x, y, pressed }
	}
}

export default {
	match: /(XInput STANDARD GAMEPAD|Xbox 360.*Controller)/i,
	type: "xbox 360",
	buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start"],
	standardDPads: [[14, 12, 15, 13]],
	init: luxController => {
		const sticks = []
		Object.defineProperty(sticks, 0, { get: stick(luxController, 0, 1, 10) })
		Object.defineProperty(sticks, 1, { get: stick(luxController, 2, 3, 11) })
		luxController.sticks = sticks
	}
}
