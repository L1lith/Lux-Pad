import autoBind from "auto-bind"
import getControllerConfig from "./getControllerConfig"
import standardDPad from "./controllers/functions/standardDPad"

// var first = true
//
class LuxController {
	constructor(rawController, rawControllers) {
		autoBind(this)
		this.rawController = rawController
		this.id = rawController.id
		this.buttons = {}
		this.sticks = []
		this.ready = null
		this.connected = true
		this.controllerConfig = getControllerConfig(rawController, rawControllers)
		if (!this.controllerConfig) throw new Error("No Controller Config Found")
		this.update()
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
				if (first) {
					console.log("hi", this)
					first = false
				}
				this.controllerConfig.buttons.forEach((button, index) => {
					if (!button) return
					this.buttons[button] = this.rawController.buttons[index].pressed
				})
			}
		} else {
			this.type = "unknown"
		}
	}
	update() {
		if (this.controllerConfig && this.controllerConfig.hasOwnProperty("buttons")) {
			//console.log("a", this)
			this.controllerConfig.buttons.forEach((button, index) => {
				if (!button) return
				this.buttons[button] = this.rawController.buttons[index].pressed
			})
		}
	}
	disconnected() {
		this.connected = false
	}
}

export default LuxController
