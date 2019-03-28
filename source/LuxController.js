import autoBind from "auto-bind"
import getControllerConfig from "./getControllerConfig"
import standardDPad from "./controllers/functions/standardDPad"

class LuxController {
	constructor(rawController, rawControllers) {
		autoBind(this)
		this.rawController = rawController
		this.id = rawController.id
		this.buttons = {}
		this.sticks = null
		this.ready = null
		this.connected = true
		this.eventListeners = {disconnected: []}
		this.controllerConfig = getControllerConfig(rawController, rawControllers)
		if (!this.controllerConfig) throw new Error("No Controller Config Found")
		if (typeof this.controllerConfig.init == "function") {
			const output = this.controllerConfig.init(this, rawController, rawControllers)
			if (output instanceof Promise) this.ready = output
		}
		if (this.controllerConfig) {
			this.type = this.controllerConfig.type
			if (this.controllerConfig.hasOwnProperty("details")) this.details = this.controllerConfig.details
			if (this.controllerConfig.hasOwnProperty("standardDPads")) {
				const { standardDPads } = this.controllerConfig
				if (standardDPads.length === 1) {
					Object.defineProperty(this, "dPad", { get: standardDPad(this, ...standardDPads[0]) })
				} else {
					this.dPads = []
					this.controllerConfig.standardDPads.forEach((args, index) => {
						Object.defineProperty(this.dPads, index, { get: standardDPad(this, ...args) })
					})
				}
			}
			if (this.controllerConfig.hasOwnProperty("properties")) {
				Object.entries(this.controllerConfig.properties).forEach(([key, value]) => {
					this[key] = value
				})
			}
			if (this.controllerConfig.hasOwnProperty("buttons")) {
			  this.controllerConfig.buttons.forEach((button, index) => {
			    if (!button) return
			    Object.defineProperty(this.buttons, button, {get: ()=>this.rawController.buttons[index].pressed, enumerable: true, configurable: false})
			  })
			}
		} else {
			this.type = "unknown"
		}
	}
	disconnected() {
		this.connected = false
		this.gamepad = null
		this.eventListeners.disconnected.forEach(listener => listener.apply(this))
	}
}

export default LuxController
