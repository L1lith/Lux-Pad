function standardAxes(luxController, axes1, axes2, deadZone = 0.1) {
  return ()=>{
    const {axes} = luxController.rawController
    let x = axes[axes1]
    let y = axes[axes2]
    if (Math.abs(x) <= deadZone) x = 0
    if (Math.abs(y) <= deadZone) y = 0
    return {x, y}
  }
}

export default standardAxes
