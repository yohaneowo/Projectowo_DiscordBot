const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction, client) {
    const username = interaction.user.tag;
    const user_avatar = interaction.user.displayAvatarURL({ dynamic: true });
    const InteractionFinalReply = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("╲⎝⧹Ping⧸⎠╱")
      .setDescription(
        `**»**⠀\`延迟...${client.ws.ping}ms\` <a:Meow:761724979720617994>`
      )
      .setTimestamp()
      .setFooter({ text: `Requested by ${username}`, iconURL: user_avatar });
    await interaction.reply({ embeds: [InteractionFinalReply] });
  }
};
