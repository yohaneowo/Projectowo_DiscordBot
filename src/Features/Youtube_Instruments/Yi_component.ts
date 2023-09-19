


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ActionRowB... Remove this comment to see the full error message
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");




// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Button'.
const Button = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("primary")
    .setLabel("🎼簡譜")
    .setStyle(ButtonStyle.Primary)
);



module.exports = {
  Button
};
