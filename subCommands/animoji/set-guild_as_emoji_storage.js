const {
  Animoji_DatabaseFunction
} = require('../../commands_modules/animoji/a_databaseFunctionManager.js')
const {
  Animoji_FunctionManager
} = require('../../commands_modules/animoji/a_FunctionManager.js')
module.exports = async (interaction) => {
  const animojiDbManager = new Animoji_DatabaseFunction()
  const animojiFunctionManager = new Animoji_FunctionManager()
  const owner_id = interaction.guild.ownerId
  const user_id = interaction.user.id
  const guild_id = interaction.guild.id
  const isEmojiPack = 0
  if (owner_id == user_id) {
    console.log(`interaction guild_id: ${guild_id}`)
    const isGuildExist = await animojiDbManager.getGuild(user_id, guild_id)
    console.log(`isGuildExist: ${isGuildExist}`)
    if (isGuildExist) {
      interaction.editReply({
        content: `This guild is already registered`,
        ephemeral: true
      })
    } else {
      const isEmojiGuildExist = await animojiDbManager.checkEmojiGuildExist(
        guild_id
      )
      console.log(`isEmojiGuildExist: ${isEmojiGuildExist}`)
      if (!isEmojiGuildExist) {
        await animojiDbManager.insertGuild(user_id, guild_id)
        try {
          await animojiFunctionManager.insert_AllEmoji(
            interaction,
            guild_id,
            user_id,
            isEmojiPack
          )
          interaction.editReply({ content: `done set guild`, ephemeral: true })
        } catch (err) {
          interaction.followUp({ content: `发现有同名的哦`, ephemeral: true })
        }
      } else {
        await animojiDbManager.deleteEmoji(guild_id)
        try {
          await animojiFunctionManager.insert_AllEmoji(
            interaction,
            guild_id,
            user_id,
            isEmojiPack
          )
          interaction.editReply({ content: `done set guild`, ephemeral: true })
        } catch (err) {
          interaction.followUp({ content: `发现有同名的哦`, ephemeral: true })
        }
      }
    }
  } else {
    interaction.reply({
      content: `You are not the owner of this server`,
      ephemeral: true
    })
  }
}
