const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animoji")
    .setDescription("animoji !")
    .addStringOption((option) =>
      option
        .setName("meow_ヽowoノ")
        .setDescription("The animoji subcommands")
        .setRequired(true)
        .addChoices(
          {
            name: "set-guild_as_emoji_storage",
            value: "set-guild_as_emoji_storage"
          },
          {
            name: "set-prefix",
            value: "set-prefix"
          },
          {
            name: "manually-refresh_emoji",
            value: "manually-refresh_emoji"
          },
          {
            name: "remove-this_guild's_emojis_database",
            value: "remove-this_guild's_emojis_database"
          },
          {
            name: "set-emoji_pack_server",
            value: "set-emoji_pack_server"
          },
          {
            name: "delete-emoji_pack_server",
            value: "delete-emoji_pack_server"
          }
        )
    ),

  async execute(interaction, client) {
    const subcommand = interaction.options.getString("meow_ヽowoノ");

    if (subcommand == "set-guild_as_emoji_storage") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand == "set-prefix") {
      // prefix didn't not use defer due to modal cant use defer
      client.loadSubcommands(interaction, client);
    } else if (subcommand == "manually-refresh_emoji") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand == "remove-this_guild's_emojis_database") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand == "set-emoji_pack_server") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    } else if (subcommand == "delete-emoji_pack_server") {
      await interaction.deferReply({ fetchReply: true });
      client.loadSubcommands(interaction, client);
    }
  }
};
