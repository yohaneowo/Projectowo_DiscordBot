const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcomer")
    .setDescription("Create a dynamic voice channel")
    .addStringOption((option) =>
      option
        .setName("meow_ヽowoノ")
        .setDescription("welcomer subcommands")
        .setRequired(true)
        .addChoices(
          { name: "set", value: "set" },
          { name: "delete", value: "delete" }
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getString("meow_ヽowoノ");
    console.log(subcommand);
    if (subcommand === "set") {
      // Set the status display of the member count
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand === "delete") {
      // Delete the status display of the member count
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    }
  }
};
