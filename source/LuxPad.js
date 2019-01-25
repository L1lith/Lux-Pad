import autoBind from 'auto-bind'
import LuxController from './LuxController'

class LuxPad {
  constructor(options=null) {
    autoBind(this)
    if (typeof options != 'object') throw new Error("Options must be an object or null.")
    if (options === null) options = {}
    if (typeof navigator.getGamepads != 'function') throw new Error("Your browser does not support the Gamepad API.")
    window.addEventListener('gamepadconnected', this.gamepadconnected)
    this.rawControllers = navigator.getGamepads()
    this.controllers = [...this.rawControllers].map(controller => new LuxController(controller))
    this.eventListeners = {controller: []}
  }
  gamepadconnected(event) {
    this.rawControllers = navigator.getGamepads()
    const controller = this.rawControllers[event.gamepad.index]
    this.eventListeners.controller.forEach(listener => listener(controller))
  }
  addEventListener(eventName, callback) {
    if (typeof eventName != 'string' || !this.eventListeners.hasOwnProperty(eventName)) throw new Error("Invalid Event Name")
    if (typeof callback != 'function') throw new Error("Callback must be a function")
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
    return this.addEventListener('controller', callback)
  }
  removeEventListener(eventName, callback) {
    if (typeof eventName != 'string' || !this.eventListeners.hasOwnProperty(eventName)) throw new Error("Invalid Event Name")
    if (typeof callback != 'function') throw new Error("Callback must be a function")
    const listeners = this.eventListeners[eventName]
    const callbackIndex = listeners.indexOf(callback, 1)
    if (callbackIndex < 0) return
    listeners.splice(callbackIndex, 1)
  }
}

export default LuxPad
