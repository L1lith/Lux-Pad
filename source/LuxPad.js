import autoBind from 'auto-bind'
import LuxController from './LuxController'

class LuxPad {
  constructor(options=null) {
    autoBind(this)
    if (typeof options != 'object') throw new Error("Options must be an object or null.")
    if (options === null) options = {}
    const {refreshRate=20} = options
    if (typeof navigator.getGamepads != 'function') throw new Error("Your browser does not support the Gamepad API.")
    this.rawControllers = navigator.getGamepads()
    window.addEventListener('gamepadconnected', this.gamepadconnected)
    this.controllers = [...this.rawControllers].filter(controller => controller !== null).map(controller => new LuxController(controller, this.rawControllers))
    this.eventListeners = {controller: []}
    this.refreshInterval = null
    if (isFinite(refreshRate) && refreshRate !== null) {
      this.refreshInterval = setInterval(()=>{
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
  findControllers(search) {
    if (typeof search != 'object' || search === null) throw new Error("Search must be an object")
    const queries = Object.entries(search)
    return this.controllers.filter(controller => {
      if (!controller) return false
      return queries.filter((property, value) => {
        controller[property] === value
      })
    })
  }
  findController(search) {
    return this.findControllers(search)[0] || null
  }
  gamepadconnected(event) {
    console.log(this.eventListeners)
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
