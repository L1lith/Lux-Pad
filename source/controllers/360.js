import standardDPad from './functions/standardDPad'

export default {
  match: /XInput STANDARD GAMEPAD/i,
  type: "xbox 360",
  buttons: ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', "Back", "Start"],
  standardDPads: [[14, 12, 15, 13]]
}
