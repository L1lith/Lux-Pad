import autoBind from "auto-bind"
import LuxController from "./LuxController"

class LuxPad {
	constructor(options = null) {
		autoBind(this)
		if (typeof options != "object") throw new Error("Options must be an object or null.")
		if (options === null) options = {}
		const { refreshRate = 20 } = options
		if (typeof navigator.getGamepads != "function") throw new Error("Your browser does not support the Gamepad API.")
		this.rawControllers = navigator.getGamepads()
		window.addEventListener("gamepadconnected", this.gamepadconnected)
		this.controllers = [...this.rawControllers]
			.filter(controller => controller !== null && !(controller instanceof LuxController))
			.map(controller => new LuxController(controller, this.rawControllers))
		this.eventListeners = { controller: [] }
		this.refreshInterval = null
		if (isFinite(refreshRate) && refreshRate !== null) {
			this.refreshInterval = setInterval(() => {
				this.rawControllers = navigator.getGamepads()
				this.controllers.forEach((luxController, index) => {
					if (!luxController) return
					const rawController = this.rawControllers[luxController.rawController.index]
					if (!rawController) {
						this.controllers.splice(index, 1)
						luxController.disconnected()
						return
					}
					luxController.rawController = rawController
					luxController.update()
				})
			}, refreshRate)
		}
	}
	findControllers(search=null, controllers = null) {
		if (typeof search != "object") throw new Error("Search must be an object or null")
		if (controllers === null) controllers = this.controllers
    if (search === null) return controllers[0] || null
		const queries = Object.entries(search)
		return controllers.filter(controller => {
			if (!controller) return false
			return queries.every(([property, value]) => controller[property] === value)
		})
	}
	findController(search) {
		return this.findControllers(search)[0] || null
	}
	waitForController(search, options = {}) {
		const { timeout = 30000, checkInterval = 200 } = options
		let listener
		const promise = new Promise((resolve, reject) => {
			const existingController = this.findController(search)
			if (existingController) return resolve(existingController)
			listener = () => {
				controller = this.findController(search)
				if (controller) {
					resolve(controller)
				}
			}
			this.addEventListener("controller", listener)
			if (isFinite(timeout) && timeout !== null && timeout > 0) {
				setTimeout(() => {
					reject(new Error("Timed Out"))
				}, timeout)
			}
		})
		if (listener) {
			promise.finally(() => {
				this.removeEventListener("controller", listener)
			})
		}
		return promise
	}
	gamepadconnected(event) {
    this.rawControllers.push(event.gamepad)
		const controller = new LuxController(event.gamepad, this.rawControllers)
		this.controllers.push(controller)
		this.eventListeners.controller.forEach(listener => listener(controller))
	}
	addEventListener(eventName, callback) {
		if (typeof eventName != "string" || !this.eventListeners.hasOwnProperty(eventName))
			throw new Error("Invalid Event Name")
		if (typeof callback != "function") throw new Error("Callback must be a function")
		const listeners = this.eventListeners[eventName]
		if (listeners.includes(callback)) return
		listeners.push(callback)
	}
	on(eventName, callback) {
		return this.addEventListener(eventName, callback)
	}
	onGamepad(callback) {
		return this.onController(callback)
	}
	onController(callback) {
		return this.addEventListener("controller", callback)
	}
	removeEventListener(eventName, callback) {
		if (typeof eventName != "string" || !this.eventListeners.hasOwnProperty(eventName))
			throw new Error("Invalid Event Name")
		if (typeof callback != "function") throw new Error("Callback must be a function")
		const listeners = this.eventListeners[eventName]
		const callbackIndex = listeners.indexOf(callback, 1)
		if (callbackIndex < 0) return
		listeners.splice(callbackIndex, 1)
	}
}

export default LuxPad
