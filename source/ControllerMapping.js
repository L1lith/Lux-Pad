import LuxController from "./LuxController"
import MappedController from "./MappedController"
import mapController from "./mapController"

class ControllerMapping {
	constructor(mapping) {
		if (typeof mapping != "object" || mapping === null) throw new Error("Controller Mapping must be an object")
		if (Object.keys(mapping).length < 1) throw new Error("Must supply a mapping for at least 1 controller")
		this.mapping = mapping
	}
	mapController(controller) {
		if (!(controller instanceof LuxController)) throw new Error("Must supply a Lux Controller Instance")
		if (!this.mapping.hasOwnProperty(controller.type) && !this.mapping.hasOwnProperty("default"))
			throw new Error("No mapping for supplied controller")
		const mapping = this.mapping[controller.type] || this.mapping.default
		const mappedController = new MappedController(controller, mapping)
		mapController(mappedController, mapping)
		return mappedController
	}
}

export default ControllerMapping
