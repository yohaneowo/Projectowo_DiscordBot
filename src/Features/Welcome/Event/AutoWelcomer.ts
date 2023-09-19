


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'client'.
// import client from "@index"


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
// const sqlite3 = require("sqlite3")



// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Welcomer_D... Remove this comment to see the full error message
// const { Welcomer_DatabaseManager } = require("../wc_databaseFunctionManager.js")



// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createCanv... Remove this comment to see the full error message
// const { createCanvas, loadImage, registerFont } = require("canvas")


// const { AttachmentBuilder } = require("discord.js")


// module.exports = {
//   name: "guildMemberAdd",
//   once: false,
//   async execute(member) {
//     const welcomer_DatabaseManager = new Welcomer_DatabaseManager()
//     const guild_Ids = await welcomer_DatabaseManager.getGuildIds_Welcomer()



//     if (guild_Ids.includes(member.guild.id)) {
//       try {
//         const userTag = member.user.tag
//         const usersCount = member.guild.members.cache.filter(
//           (member) => !member.user.bot
//         ).size
//         const Welcomer_row =
//           await welcomer_DatabaseManager.getWelcomer_Collection(member.guild.id)
//         member.guild.channels
//           .fetch(Welcomer_row[0].Set_Channel)
//           .then(async (channel) => {
//             const canvas = createCanvas(600, 400)
//             const ctx = canvas.getContext("2d")
//             //  load font


//             registerFont(process.cwd() + "/lib/Fonts/Hiragino_Sans_TC_W6.otf", {
//               family: "MyFont"
//             })
//             // load Background
//             loadImage("./lib/img/welcomer/background.png").then(
//               async (image) => {
//                 // add layer
//                 ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
//                 const width = 150
//                 const height = 150
//                 const userAvatarURL = member.user.displayAvatarURL({
//                   format: "png",
//                   dynamic: true,
//                   size: 1024
//                 })
//                 let newURL = userAvatarURL.replace(/webp/g, "png")
//                 const user_avatar = await loadImage(newURL)
//                 const radius = 100
//                 const circleCanvas = createCanvas(radius * 2, radius * 2)
//                 const circleCtx = circleCanvas.getContext("2d")
//                 circleCtx.beginPath()
//                 circleCtx.arc(radius, radius, radius, 0, 2 * Math.PI)
//                 circleCtx.closePath()
//                 circleCtx.clip()
//                 circleCtx.drawImage(user_avatar, 0, 0, radius * 2, radius * 2)
//                 // 设置字体样式
//                 ctx.font = "35px Arial"
//                 ctx.fillStyle = "#6A78D1"
//                 ctx.textAlign = "center"
//                 const circleX = canvas.width / 2 - radius
//                 const circleY = 175 - radius
//                 const welcome_textY = circleY + radius * 2 + 50
//                 const count_textY = circleY + radius * 2 + 100

//                 // 绘制欢迎文本
//                 const welcomeText = `${userTag} just joined the server`
//                 const CountText = `Member #${usersCount}`
//                 await ctx.drawImage(
//                   circleCanvas,
//                   circleX,
//                   circleY,
//                   radius * 2,
//                   radius * 2
//                 )
//                 ctx.fillText(welcomeText, canvas.width / 2, welcome_textY)
//                 ctx.fillText(CountText, canvas.width / 2, count_textY)

//                 // 保存 Canvas 为 PNG 图片
//                 // const out = fs.createWriteStream(process.cwd() + '/welcome.png');
//                 const stream = canvas.createPNGStream()
//                 const attachment = await new AttachmentBuilder(stream)
//                 await channel.send({ files: [attachment] })
//               }
//             )
//           })
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     //
//   }
// }
