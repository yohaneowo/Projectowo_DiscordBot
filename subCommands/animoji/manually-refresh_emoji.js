const {
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");
const {
  Animoji_FunctionManager
} = require("../../commands_modules/animoji/a_FunctionManager.js");

module.exports = async (interaction) => {
  const guild_id = interaction.guild.id;
  const animojiFunctionManager = new Animoji_FunctionManager();
  const animojiDbManager = new Animoji_DatabaseFunction();
  const owner_id = interaction.guild.ownerId;
  const user_id = interaction.user.id;
  const isEmojiPack = 0;
  if (owner_id == user_id) {
    await animojiDbManager.delete_AllEmoji(guild_id);
    try {
      await animojiFunctionManager.insert_AllEmoji(
        interaction,
        guild_id,
        user_id,
        isEmojiPack
      );
      interaction.editReply({ content: "done set guild", ephemeral: true });
    } catch (err) {
      interaction.followUp({ content: "发现有同名的哦", ephemeral: true });
    }
  }
};
