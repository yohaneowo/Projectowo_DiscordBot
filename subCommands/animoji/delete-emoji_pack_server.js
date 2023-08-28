const {
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");

module.exports = async (interaction) => {
  const guild_id = interaction.guild.id;
  const animojiDatabaseManager = new Animoji_DatabaseFunction();
  try {
    await animojiDatabaseManager.delete_EmojiPack(guild_id);
    await interaction.guild.emojis.cache.forEach(async (emoji) => {
      await emoji.delete();
    });
    await interaction.editReply({
      content: "done delete emoji_pack_server",
      ephemeral: true
    });
  } catch (err) {
    await interaction.editReply({
      content: "no such emoji_pack_server",
      ephemeral: true
    });
  }
};
