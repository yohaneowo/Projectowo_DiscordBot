const {
  VideoParser_DatabaseManager
} = require("../commands_modules/video_parser/vp_databaseManager.js")
const tiktok_parser = require("../commands_modules/video_parser/tiktok.js")
const VideoParser_Config = require("../databaseFunction/VideoParser_Config.js")
const douyin_parser = require("../commands_modules/video_parser/douyin.js")
const facebook_parser = require("../commands_modules/video_parser/facebook.js")
module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const guild_id = message.guild.id
    const vp_databaseManager = new VideoParser_DatabaseManager()
    const videoParserConfig = new VideoParser_Config()
    if (message.author.bot) return
    if (message.channel.type === "DM") return
    const serverConfig = await vp_databaseManager.getServerConfig(
      message.guild.id
    )
    const videoParser = await videoParserConfig.getVP_Config(guild_id)
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
      matchedUrl[0].includes("fb") ||
      matchedUrl[0].includes("reel")
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
