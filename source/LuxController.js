import autoBind from 'auto-bind'
import getControllerConfig from './getControllerConfig'

class LuxController {
  constructor(rawController, rawControllers) {
    autoBind(this)
    this.rawController = rawController
    this.buttons = {}
    this.sticks = []
    this.ready = null
    this.connected = true
    this.controllerConfig = getControllerConfig(rawController, rawControllers)
    this.update()
    if (typeof this.controllerConfig.init == 'function') {
      const output = this.controllerConfig.init(this, rawController, rawControllers)
      if (output instanceof Promise) this.ready = output
    }
  }
  update() {
    if (this.controllerConfig) {
      this.type = this.controllerConfig.type
      if (this.controllerConfig.hasOwnProperty('properties')) {
        Object.entries(this.controllerConfig.properties).forEach(([key, value]) => {
          this[key] = value
        })
      }
      this.controllerConfig.buttons.forEach((button, index) => {
        if (!button) return
        this.buttons[button] = this.rawController.buttons[index]
      })

    } else {
      this.type = 'unknown'
    }
  }
  disconnected() {
    this.connected = false
  }
}

export default LuxController
