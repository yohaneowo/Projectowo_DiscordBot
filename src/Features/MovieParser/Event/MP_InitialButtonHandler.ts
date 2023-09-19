


// import {Interaction, InteractionType} from "discord.js"
// import Server_Config from "../../../databaseFunction/db_ServerConfig"


// const MovierParser_Interaction_Components = require("../mp_component.js")



// const MovieParser_FunctionManager = require("../mp_functionManager.js")




// const TMDB_ApiFunction = require("../tmdb_apiFunction.js")



// const TMDB_SessionId = require("../../../databaseFunction/TMDB_SessionId.js")



// import client from "../../../index"
// const searchCooldowns = new Map()

// client.on("interactionCreate", async (interaction) => {
//   if (interaction.type == InteractionType.MessageComponent) {
//     if (interaction.customId == "searchMovie") {
//       // interaction.deferUpdate()
//       interaction.deferUpdate()

//       let custom_desc
//       let custom_color
//       const user_id = interaction.user.id

//       const mp_InteractionComponents = new MovierParser_Interaction_Components()
//       const tmdb_AuthenticationEmbed =
//         mp_InteractionComponents.tmdb_AuthenticationEmbed

//       const tmdb_SessionId = new TMDB_SessionId()
//       const sessionId = await tmdb_SessionId.getSessionId(user_id)
//       if (!sessionId) {
//         custom_desc =
//           "你還沒有登入! \n 請前往\n https://www.themoviedb.org/signup **註冊賬號**, \n 並且請使用 `/tmdb-登入` 指令登入"
//         custom_color = "#FF0000"
//         tmdb_AuthenticationEmbed.setDescription(custom_desc)
//         tmdb_AuthenticationEmbed.setColor(custom_color)
//         const informLoginMsg = await interaction.channel.send({
//           embeds: [tmdb_AuthenticationEmbed]
//         })
//         setTimeout(() => {
//           informLoginMsg.delete()
//         }, 60000)
//         return
//       }

//       if (searchCooldowns.has(user_id)) {
//         // 如果用户在冷却时间内连续点击，忽略按钮点击事件
//         return
//       }
//       searchCooldowns.set(user_id, true)
//       setTimeout(() => {
//         searchCooldowns.delete(user_id)
//       }, 60000)

//       const informKeyInMsg = await interaction.channel.send({
//         content: `<@${user_id}>请输入你要搜索的电影名字`
//       })
//       const mp_functionManager = new MovieParser_FunctionManager()

//       const collectorFilter = (m) => m.author.id === user_id
//       const msgCollector = interaction.channel.createMessageCollector({
//         filter: collectorFilter,
//         time: 60000,
//         max: 1
//       })

//       msgCollector.on("collect", async (message) => {
//         const tmdb_apiFunction = new TMDB_ApiFunction()
//         const channel_id = message.channel.id
//         const guild_id = message.guild.id
//         const user_id = message.author.id
//         const channel = message.guild.channels.cache.get(channel_id)
//         const user_avatar = message.author.avatarURL()
//         const displayName = interaction.user.displayName

//         // console.log(
//         //   `Interaction_display_name: ${interaction.member.displayName}`
//         // )

//         let keyword = message.content
//         // await informKeyInMsg.delete()
//         const { media_type, media_data } =
//           await mp_functionManager.handleMediaSearch(
//             message,
//             channel_id,
//             keyword,
//             null
//           )
//         let searchedData = {
//           media_type: media_type,
//           media_data: media_data
//         }
//         let user_info = {
//           sessionId: sessionId,
//           user_avatar: user_avatar,
//           displayName: displayName
//         }
//         let interaction_params = {
//           message: message,
//           channel: channel
//         }
//         const ratingScore =
//           await mp_functionManager.convertEmbedSendMediaInfoAndSendRatingForm(
//             searchedData,
//             user_info,
//             interaction_params
//           )
//         await tmdb_apiFunction.addRating(sessionId, searchedData, ratingScore)
//         // await channel.send({
//         //   content: `你评分${ratingScore}`
//         // })
//         console.log(`Collected ${message.content}`)
//       })

//       msgCollector.on("end", async (collected) => {
//         await informKeyInMsg.delete()

//         console.log(`Collected ${collected.size} items`)
//       })

//       //   console.log("searchMovie")
//     }
//   }
// })
