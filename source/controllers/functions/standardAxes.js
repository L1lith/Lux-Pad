function standardAxes(luxController, axes1, axes2, deadZone = 0.1) {
  return ()=>{
    const {rawController} = luxController
    let x = rawControllers.axes[axes1]
    let y = rawControllers.axes[axes2]
    if (Math.abs(axes1) <= deadZone) x = 0
    if (Math.abs(axes2) <= deadZone) y = 0
    return {x, y}
  }
}

export default standardAxes
