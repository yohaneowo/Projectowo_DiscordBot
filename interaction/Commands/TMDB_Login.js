const { SlashCommandBuilder, EmbedBuilder, Component } = require("discord.js")
const TMDB_ApiFunction = require("../../commands_modules/movie_parser/tmdb_apiFunction")
const eventManager = require("../../handlers/CustomEvent")
const TMDB_SessionId = require("../../databaseFunction/TMDB_SessionId.js")
const MovieParser_Interaction_Components = require("../../commands_modules/movie_parser/mp_component.js")
const MovieParser_FunctionManager = require("../../commands_modules/movie_parser/mp_functionManager.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tmdb-登入")
    .setDescription("TMDB 登入"),
  async execute(interaction) {
    let custom_desc
    let custom_color
    const user_id = interaction.user.id
    await interaction.deferReply()
    const tmdb_SessionId = new TMDB_SessionId()
    const tmdb_apiFunction = new TMDB_ApiFunction()
    const mp_InteractionComponents = new MovieParser_Interaction_Components()
    const mp_FunctionManager = new MovieParser_FunctionManager(interaction)
    const tmdb_AuthenticationEmbed =
      mp_InteractionComponents.tmdb_AuthenticationEmbed
    const handleSessionIdButton = mp_InteractionComponents.handleSessionIdButton
    const confirmButton = mp_InteractionComponents.authConfirmButton
    const sessionId = await tmdb_SessionId.getSessionId(user_id)

    if (sessionId) {
      custom_desc = "你已经授权过了哦 \n \n `你可以选择重置或者删除你的授权`"
      custom_color = "#4682B4"

      tmdb_AuthenticationEmbed.setDescription(custom_desc)
      tmdb_AuthenticationEmbed.setColor(custom_color)

      const response = await interaction.editReply({
        embeds: [tmdb_AuthenticationEmbed],
        components: [handleSessionIdButton],
        ephemeral: true
      })

      const collectorFilter = (i) => i.user.id === interaction.user.id

      try {
        const selectedButton = await response.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000
        })

        if (selectedButton.customId === "resetSessionId") {
          custom_desc = "確認重置授权"
          custom_color = "#6A5ACD"

          selectedButton.deferUpdate()

          tmdb_AuthenticationEmbed.setDescription(custom_desc)
          tmdb_AuthenticationEmbed.setColor(custom_color)

          const confirmationResponse = await interaction.editReply({
            embeds: [tmdb_AuthenticationEmbed],
            components: [confirmButton]
          })
          await mp_FunctionManager.handleResetSessionIdConfirmation(
            confirmationResponse,
            tmdb_AuthenticationEmbed
          )
        } else if (selectedButton.customId === "cancelManipulateSessionId") {
          custom_desc = "**已取消操作**"
          custom_color = "#FFE4B5"

          selectedButton.deferUpdate()

          tmdb_AuthenticationEmbed.setDescription(custom_desc)
          tmdb_AuthenticationEmbed.setColor(custom_color)
          await interaction.editReply({
            embeds: [tmdb_AuthenticationEmbed],
            components: []
          })
        } else if (selectedButton.customId === "deleteSessionId") {
          custom_desc = "**確認刪除授权**"
          custom_color = "#FF0000"

          selectedButton.deferUpdate()

          tmdb_AuthenticationEmbed.setDescription(custom_desc)
          tmdb_AuthenticationEmbed.setColor(custom_color)

          const confirmationResponse = await interaction.editReply({
            embeds: [tmdb_AuthenticationEmbed],
            components: [confirmButton]
          })

          await mp_FunctionManager.handleDeleteSessionIdConfirmation(
            confirmationResponse,
            tmdb_AuthenticationEmbed
          )
        }
      } catch (e) {
        // console.log(e)
        await interaction.deleteReply()
      }
    } else {
      await tmdb_apiFunction.sendAuthRequestLink(interaction, null)
    }
  }
}
