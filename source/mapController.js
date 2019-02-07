function mapController(mappedController, mapping, propChain = []) {
	const { luxController } = mappedController
	let currentPosition = luxController
	propChain.forEach(prop => (currentPosition = currentPosition[prop]))
	Object.entries(mapping).forEach(([key, value]) => {
		const chain = propChain.concat([key])
		if (typeof value === "string") {
			Object.defineProperty(mappedController.inputs, value, { get: () => deepAccess(luxController, chain) })
		} else {
			mapController(mappedController, mapping[key], chain)
		}
	})
}

function deepAccess(object, props) {
	let output = object
	props.forEach(prop => (output = output[prop]))
	return output
}

export default mapController

/*
  Example Mapping
  {
    "wii remote": {
      buttons: {
        A: "jump",
        B: "climb"
      },
      nunchuk: {
        Z: "punch",
        C: "look"
      }
    }
  }
*/
