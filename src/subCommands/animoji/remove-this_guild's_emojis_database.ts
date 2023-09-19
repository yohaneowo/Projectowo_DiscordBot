const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Da... Remove this comment to see the full error message
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");



module.exports = async (interaction) => {
  const animojiDbManager = new Animoji_DatabaseFunction();
  const owner_id = interaction.guild.ownerId;
  const user_id = interaction.user.id;
  if (owner_id == user_id) {
    const animatedEmojiCount = await interaction.guild.emojis.cache.filter(
      (emoji) => emoji.animated
    ).size;
    const staticEmojiCount = await interaction.guild.emojis.cache.filter(
      (emoji) => !emoji.animated
    ).size;

    const guild_id = interaction.guild.id;
    console.log(`user_id: ${user_id}`);
    console.log(`guild_id: ${guild_id}`);
    await animojiDbManager.deleteGuild(guild_id);
    await animojiDbManager.delete_AllEmoji(guild_id);
    interaction.editReply({
      content: `# Done remove guild \n  animated emoji count: ${animatedEmojiCount} \n  static emoji count: ${staticEmojiCount}`,
      ephemeral: true
    });
  } else {
    -interaction.editReply({
      content: "You are not the owner of this server",
      ephemeral: true
    });
  }
};
