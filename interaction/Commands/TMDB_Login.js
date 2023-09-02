const { SlashCommandBuilder, EmbedBuilder, Component } = require("discord.js")
const TMDB_ApiFunction = require("../../commands_modules/movie_parser/tmdb_apiFunction")
const eventManager = require("../../handlers/CustomEvent")
const TMDB_SessionId = require("../../databaseFunction/TMDB_SessionId.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tmdb-login")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const user_id = interaction.user.id
    await interaction.deferReply()
    const tmdb_SessionId = new TMDB_SessionId()
    const tmdb_apiFunction = new TMDB_ApiFunction()

    const sessionId = await tmdb_SessionId.getSessionId(user_id)
    console.log(sessionId)
    if (sessionId) {
      const embed = new EmbedBuilder()
        .setTitle("TMDB Authentication")
        .setDescription(
          "你已经授权过了哦 \n \n `你可以选择重置或者删除你的授权`"
        )
        .setColor("#4682B4")
        .setTimestamp()
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1146652474363609210/1146652578491412490/tmdb.png"
        )
        .setFooter({ text: "Project UwU" })
      await interaction.editReply({
        embeds: [embed],
        ephemeral: true
      })
    } else {
      const pre_msg = await interaction.editReply({
        content: "已发送授权链接，请查收",
        ephemeral: true
      })
      // setTimeout(() => {
      //   interaction.deleteReply()
      // }, 3000)
      await tmdb_apiFunction.sendAuthRequestLink(interaction, null, pre_msg)
    }
  }
}
