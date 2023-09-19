const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SlashComma... Remove this comment to see the full error message
  SlashCommandBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ActionRowB... Remove this comment to see the full error message
  ActionRowBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'StringSele... Remove this comment to see the full error message
  StringSelectMenuBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ButtonBuil... Remove this comment to see the full error message
  ButtonBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ButtonStyl... Remove this comment to see the full error message
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ComponentT... Remove this comment to see the full error message
const { ComponentType } = require("discord.js")




// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'modal'.
const modal = new ModalBuilder().setCustomId("modal").setTitle("Animoji owo_b")

const prefixInput = new TextInputBuilder()
  .setLabel("Set your own prefix")
  .setCustomId("prefix")
  .setPlaceholder("Enter a prefix")
  .setMinLength(1)
  .setValue(">")
  .setStyle(TextInputStyle.Short)

const firstActionRow = new ActionRowBuilder().addComponents(prefixInput)
modal.addComponents(firstActionRow)



module.exports = {
  modal
}
