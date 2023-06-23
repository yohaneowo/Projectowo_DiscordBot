const {
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");

module.exports = async (interaction) => {
  const animojiDbManager = new Animoji_DatabaseFunction();
  const owner_id = interaction.guild.ownerId;
  const user_id = interaction.user.id;
  if (owner_id == user_id) {
    const guild_id = interaction.guild.id;
    console.log(`user_id: ${user_id}`);
    console.log(`guild_id: ${guild_id}`);
    await animojiDbManager.deleteGuild(guild_id);
    await animojiDbManager.delete_AllEmoji(guild_id);
    interaction.editReply({ content: "done remove guild", ephemeral: true });
  } else {
    interaction.editReply({
      content: "You are not the owner of this server",
      ephemeral: true
    });
  }
};
