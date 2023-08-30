const { SlashCommandBuilder, EmbedBuilder, Component } = require("discord.js")
const TMDB_ApiFunction = require("../../commands_modules/movie_parser/tmdb_apiFunction")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tmdb-login")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.deferReply()
    await interaction.editReply({
      content: "已发送授权链接，请查收",
      ephemeral: true
    })
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000)
    const tmdb_apiFunction = new TMDB_ApiFunction()
    await tmdb_apiFunction.sendAuthRequestLink(interaction)
  }
}
