function stick(luxController, xAxes, yAxes, pressButton = null) {
	luxController.deadZone = 0.1
	return () => {
		const { axes, buttons } = luxController.rawController
		const { deadZone } = luxController
		let x = axes[xAxes]
		let y = axes[yAxes]
		if (Math.abs(x) <= deadZone) x = 0
		if (Math.abs(y) <= deadZone) y = 0
		const { pressed } = pressButton !== null ? buttons[pressButton] : null
		return { x, y, pressed }
	}
}

export default stick
