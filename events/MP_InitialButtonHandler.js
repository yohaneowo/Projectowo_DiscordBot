const { Interaction, InteractionType } = require("discord.js")
const Genaral_DatabaseManager = require("../commands_modules/general_modules/general_dbManager.js")
const MovieParser_FunctionManager = require("../commands_modules/movie_parser/mp_functionManager.js")
const TMDB_SessionId = require("../databaseFunction/TMDB_SessionId.js")
const client = require("../index.js")
client.on("interactionCreate", async (interaction) => {
  if (interaction.type == InteractionType.MessageComponent) {
    if (interaction.customId == "searchMovie") {
      const informKeyInMsg = await interaction.channel.send({
        content: "请输入你要搜索的电影名字"
      })
      const tmdb_SessionId = new TMDB_SessionId()
      const mp_functionManager = new MovieParser_FunctionManager()
      const user_id = interaction.user.id

      const collectorFilter = (m) => m.author.id === user_id
      const msgCollector = interaction.channel.createMessageCollector({
        filter: collectorFilter,
        time: 60000,
        max: 1
      })
      msgCollector.on("collect", async (message) => {
        const channel_id = message.channel.id
        const guild_id = message.guild.id
        const user_id = message.author.id
        const channel = message.guild.channels.cache.get(channel_id)
        const user_avatar = message.author.avatarURL()
        const displayName = interaction.user.displayName

        console.log(
          `Interaction_display_name: ${interaction.member.displayName}`
        )

        let keyword = message.content
        const sessionId = await tmdb_SessionId.getSessionId(user_id)
        await informKeyInMsg.delete()
        const { media_type, media_data } =
          await mp_functionManager.handleMediaSearch(
            message,
            channel_id,
            keyword,
            null
          )
        let searchedData = {
          media_type: media_type,
          media_data: media_data
        }
        let user_info = {
          sessionId: sessionId,
          user_avatar: user_avatar,
          displayName: displayName
        }
        let interaction_params = {
          message: message,
          channel: channel
        }
        await mp_functionManager.convertEmbedSendMediaInfoAndSendRatingForm(
          searchedData,
          user_info,
          interaction_params
        )

        // await channel.send({
        //   content: `你评分${ratingScore}`
        // })
        console.log(`Collected ${message.content}`)
      })

      //   msgCollector.on("end", (collected) => {
      //     console.log(`Collected ${collected.size} items`)
      //   })

      //   console.log("searchMovie")
    }
  }
})
