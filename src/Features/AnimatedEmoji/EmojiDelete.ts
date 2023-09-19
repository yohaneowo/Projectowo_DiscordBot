


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Da... Remove this comment to see the full error message
// const { Animoji_DatabaseFunction } = require("../a_databaseFunctionManager.js")



// module.exports = {
//   name: "emojiDelete",
//   once: false,
//   async execute(emoji) {
//     const emoji_identifier = emoji.toString()
//     const guild_id = emoji.guild.id
//     const animojiDbManager = new Animoji_DatabaseFunction()
//     const isGuildExist = await animojiDbManager.getGuild(guild_id)
//     if (isGuildExist) {
//       try {
//         await animojiDbManager.delete_Emoji(emoji_identifier)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }
// }
