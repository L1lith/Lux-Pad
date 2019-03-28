function standardAxesDPad(luxController, axesNumber) {
  return ()=>{
    let rawValue = luxController.rawController.axes[axesNumber]
    const absValue = Math.abs(rawValue)
    let x, y
    if (rawValue >= 1.01) return {x: 0, y: 0}
    // NOTE TO SELF: DIAGONAL INPUT DOESN'T WORK PROPERLY
    if (rawValue <= -0.99 || Math.abs(rawValue) <= 0.15) {
      x = 0
    } else if (rawValue > 0) {
      x = -1
    } else {
      x = 1
    }
    if (rawValue > 1.01 || Math.abs(absValue - 0.7) <= 0.1 || Math.abs(rawValue + 0.4) <= 0.1) {
      y = 0
    } else if (absValue > 0.5) {
      y = -1
    } else {
      y = 1
    }
    return {x, y}
  }
}

export default standardAxesDPad
