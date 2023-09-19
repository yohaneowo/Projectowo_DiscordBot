


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Da... Remove this comment to see the full error message
// const { Animoji_DatabaseFunction } = require("../a_databaseFunctionManager.js")



// module.exports = {
//   name: "emojiCreate",
//   once: false,
//   async execute(emoji) {
//     await emoji.fetchAuthor()
//     const belong_to = emoji.author.id
//     const guild_id = emoji.guild.id
//     const emoji_id = emoji.id
//     const emoji_name = emoji.name
//     const emoji_identifier = emoji.toString()
//     console.log(`emoji_identifier: ${emoji_identifier}`)
//     const createdAt = emoji.createdAt.toString()
//     let animated = emoji.animated == "true" || emoji.animated == "false" ? 1 : 0
//     const emoji_url = emoji.url
//     const animojiDbManager = new Animoji_DatabaseFunction()

//     const isGuildExist = await animojiDbManager.getGuild(guild_id)

//     if (isGuildExist) {
//       try {

//         await animojiDbManager.insert_Emoji(
//           emoji_id,
//           emoji_name,
//           emoji_identifier,
//           guild_id,
//           createdAt,
//           animated,
//           belong_to,
//           emoji_url
//         )
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }
// }
