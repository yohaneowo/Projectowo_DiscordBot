const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Fu... Remove this comment to see the full error message
  Animoji_FunctionManager
} = require("../../commands_modules/animoji/a_FunctionManager.js");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'modal'.
const { modal } = require("../../commands_modules/animoji/a_compoment.js");



module.exports = async (interaction) => {
  const animojiFunctionManager = new Animoji_FunctionManager();
  animojiFunctionManager.submitPrefix(interaction, modal);
};
