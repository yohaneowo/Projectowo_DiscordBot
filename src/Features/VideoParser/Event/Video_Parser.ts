





// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'tiktok_par... Remove this comment to see the full error message
const tiktok_parser = require("../tiktok.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'douyin_par... Remove this comment to see the full error message
const douyin_parser = require("../douyin.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'facebook_p... Remove this comment to see the full error message
const facebook_parser = require("../facebook.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'VideoParse... Remove this comment to see the full error message
import getVP_Config from "@dbFunc/db_VideoParser_Config"
import db_ServerConfig from "@dbFunc/db_ServerConfig"

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const guild_id = message.guild.id
    if (message.author.bot) return
    if (message.channel.type === "DM") return
    const serverConfig = await db_ServerConfig.getServerConfig(
      message.guild.id
    )
    const videoParser = await getVP_Config(guild_id)
    // console.log(videoParser)


    if (serverConfig.video_parser != 1) return

    /*
      serverConfig -> video_parser enable are allowed to use video parser
    */ const regex =
      /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\)\\,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/
    const str = message.content
    const matchedUrl = str.match(regex)

    if (
      matchedUrl &&
      matchedUrl.length > 0 &&
      matchedUrl[0].includes("tiktok")
    ) {
      if (videoParser && videoParser.tiktok_parser != 1) return
      await tiktok_parser(message, matchedUrl)
    } else if (
      matchedUrl &&
      matchedUrl.length > 0 &&
      matchedUrl[0].includes("douyin")
    ) {
      // console.log("douyin")
      if (videoParser && videoParser.douyin_parser != 1) return
      await douyin_parser(message, matchedUrl)
    } else if (
      (matchedUrl &&
        matchedUrl.length > 0 &&
        matchedUrl[0].includes("facebook")) ||
      (matchedUrl && matchedUrl.length > 0 && matchedUrl[0].includes("fb")) ||
      (matchedUrl && matchedUrl.length > 0 && matchedUrl[0].includes("reel"))
    ) {
      const pattern = /posts|groups|photo/
      if (pattern.test(matchedUrl[0])) {
        return
      }
      const URL = matchedUrl[0]
      // console.log(`URL: ${URL}`)
      await facebook_parser(message, URL)
    }
  }
}
