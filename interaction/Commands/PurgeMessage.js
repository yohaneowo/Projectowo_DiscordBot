const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge-messages")
    .setDescription("purge the world")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to purge")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.channel;
    const amount = interaction.options.getInteger("amount");
    if (amount > 100) {
      const embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can only purge 100 messages at a time")
        .setColor("#ff1414")
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } else if (amount < 1) {
      const embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("1~100 messages can be purged")
        .setColor("#ff1414")
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } else {
      await channel.bulkDelete(amount);
      await interaction.deferReply({ fetchReply: true });
      const embed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription(`Purged ${amount} messages`)
        .setColor("#8fce00")
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    }
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  }
};
