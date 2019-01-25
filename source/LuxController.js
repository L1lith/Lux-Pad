import autoBind from 'auto-bind'
import getControllerConfig from './getControllerConfig'

class LuxController {
  constructor(rawController) {
    autoBind(this)
    this.rawController = rawController
    this.buttons = {}
    this.sticks = []
    this.ready = null
    this.connected = true
    const controllerConfig = getControllerConfig(rawController)
    if (controllerConfig) {
      this.type = controllerConfig.type
      if (controllerConfig.hasOwnProperty('properties')) {
        Object.entries(controllerConfig.properties).forEach(([key, value]) => {
          this[key] = value
        })
      }
      controllerConfig.buttons.forEach((button, index) => {
        if (!button) return
        this.buttons[button] = this.rawController.buttons[index]
      })
      if (typeof controllerConfig.init == 'function') {
        const output = controllerConfig.init(this, rawController)
        if (output instanceof Promise) this.ready = output
      }
    } else {
      this.type = 'unknown'
    }
  }
  disconnected() {
    this.connected = false
  }
}

export default LuxController
