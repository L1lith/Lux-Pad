function standardDPad(luxController, xLeft, yUp, xRight, yDown) {
	return () => {
		const { buttons } = luxController.rawController
		const x = buttons[xLeft].pressed ? -1 : buttons[xRight].pressed ? 1 : 0
		const y = buttons[yUp].pressed ? -1 : buttons[yDown].pressed ? 1 : 0
		return { x, y }
	}
}

export default standardDPad
