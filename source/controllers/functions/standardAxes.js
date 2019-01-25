function standardAxes(luxController, axes1, axes2, deadZone = 0.1) {
  return ()=>{
    const {rawController} = luxController
    let x = rawController.axes[axes1]
    let y = rawController.axes[axes2]
    if (Math.abs(x) <= deadZone) x = 0
    if (Math.abs(y) <= deadZone) y = 0
    return {x, y}
  }
}

export default standardAxes
