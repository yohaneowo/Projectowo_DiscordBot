const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("dynamic-voicechannel")
    .setDescription("Create a dynamic voice channel")
    .addStringOption((option) =>
      option
        .setName("meow_ヽowoノ")
        .setDescription("The dynamic-voicechannel subcommands")
        .setRequired(true)
        .addChoices(
          { name: "set", value: "set" },
          { name: "delete", value: "delete" },
          { name: "anti_mute-set", value: "anti_mute-set" },
          { name: "delete-anti_mute", value: "delete-anti_mute" }
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getString("meow_ヽowoノ");
    if (subcommand === "set") {
      // Set the status display of the member count
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand === "delete") {
      // Delete the status display of the member count
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand === "anti_mute-set") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand === "delete-anti_mute") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    }
  }
};
