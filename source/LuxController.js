import autoBind from 'auto-bind'

class LuxController {
  constructor(rawController) {
    autoBind(this)
    this.rawController = rawController
  }
}

export default LuxController
