


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Da... Remove this comment to see the full error message
// const { Animoji_DatabaseFunction } = require("../a_databaseFunctionManager.js")



// module.exports = {
//   name: "emojiUpdate",
//   once: false,
//   async execute(oldEmoji, newEmoji) {
//     if (oldEmoji !== newEmoji) {
//       const guild_id = oldEmoji.guild.id
//       const old_emoji_identifier = oldEmoji.toString()
//       const new_emoji_identifier = newEmoji.toString()
//       const new_emoji_id = newEmoji.id
//       const new_emoji_name = newEmoji.name
//       const new_emoji_url = newEmoji.url
//       const animojiDbManager = new Animoji_DatabaseFunction()
//       const isGuildExist = await animojiDbManager.getGuild(guild_id)
//       if (isGuildExist) {
//         try {
//           await animojiDbManager.update_Emoji(
//             new_emoji_identifier,
//             new_emoji_id,
//             new_emoji_name,
//             new_emoji_url,
//             old_emoji_identifier
//           )
//         } catch (err) {
//           console.log(err)
//         }
//       }
//     }
//   }
// }
