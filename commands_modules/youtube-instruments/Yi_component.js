const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const Button = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("primary")
    .setLabel("🎼簡譜")
    .setStyle(ButtonStyle.Primary)
);

module.exports = {
  Button
};
