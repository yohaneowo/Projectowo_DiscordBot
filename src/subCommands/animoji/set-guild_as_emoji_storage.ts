const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Da... Remove this comment to see the full error message
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");
const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Fu... Remove this comment to see the full error message
  Animoji_FunctionManager
} = require("../../commands_modules/animoji/a_FunctionManager.js");


module.exports = async (interaction) => {
  const animatedEmojiCount = await interaction.guild.emojis.cache.filter(
    (emoji) => emoji.animated
  ).size;
  const staticEmojiCount = await interaction.guild.emojis.cache.filter(
    (emoji) => !emoji.animated
  ).size;

  const animatedEmojiString = await interaction.guild.emojis.cache
    .filter((emoji) => !emoji.animated)
    .map((emoji) => emoji.toString())
    .join(" ");

  const staticEmojiString = await interaction.guild.emojis.cache
    .filter((emoji) => !emoji.animated)
    .map((emoji) => emoji.toString())
    .join(" ");

  let EmojiPreview = "";

  if (animatedEmojiCount > 0) {
    EmojiPreview += `**Animated Emoji**\n ${animatedEmojiString}`;
  }
  if (staticEmojiCount > 0) {
    EmojiPreview += `**Static Emoji**\n ${staticEmojiString}`;
  }

  console.log(animatedEmojiString);

  const animojiDbManager = new Animoji_DatabaseFunction();
  const animojiFunctionManager = new Animoji_FunctionManager();
  const owner_id = interaction.guild.ownerId;
  const user_id = interaction.user.id;
  const guild_id = interaction.guild.id;
  const isEmojiPack = 0;
  if (owner_id == user_id) {
    // console.log(`interaction guild_id: ${guild_id}`);

    const isGuildExist = await animojiDbManager.getGuild(user_id, guild_id);
    // console.log(`isGuildExist: ${isGuildExist}`);
    if (isGuildExist) {
      interaction.editReply({
        content: "This guild is already registered",
        ephemeral: true
      });
    } else {
      const isEmojiGuildExist = await animojiDbManager.checkEmojiGuildExist(
        guild_id
      );
      // console.log(`isEmojiGuildExist: ${isEmojiGuildExist}`);
      if (!isEmojiGuildExist) {
        await animojiDbManager.insertGuild(user_id, guild_id);
        try {
          await animojiFunctionManager.insert_AllEmoji(
            interaction,
            guild_id,
            user_id,
            isEmojiPack
          );
          interaction.editReply({
            content: `# Done set guild \n  animated emoji count: ${animatedEmojiCount} \n  static emoji count: ${staticEmojiCount} \n ${EmojiPreview}`,
            ephemeral: true
          });
        } catch (err) {
          interaction.followUp({ content: "发现有同名的哦", ephemeral: true });
        }
      } else {
        await animojiDbManager.delete_AllEmoji(guild_id);
        try {
          await animojiFunctionManager.insert_AllEmoji(
            interaction,
            guild_id,
            user_id,
            isEmojiPack
          );
          interaction.editReply({
            content: `# Done set guild \n  animated emoji count: ${animatedEmojiCount} \n  static emoji count: ${staticEmojiCount}\n \n ${EmojiPreview}`,
            ephemeral: true
          });
        } catch (err) {
          interaction.followUp({ content: "发现有同名的哦", ephemeral: true });
        }
      }
    }
  } else {
    interaction.reply({
      content: "You are not the owner of this server",
      ephemeral: true
    });
  }
};
