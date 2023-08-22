const Genaral_DatabaseManager = require("../commands_modules/general_modules/general_dbManager.js")
const MovierParser_Interaction_Components = require("../commands_modules/movie_parser/mp_component.js")
const MovieParser_FunctionManager = require("../commands_modules/movie_parser/mp_functionManager.js")
require("dotenv").config()

const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  //   organization: "org-WecKezcKCTAvPKnYCL5UEv3Y",
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const guild_id = message.guild.id
    const mp_databaseManager = new Genaral_DatabaseManager()
    const mp_functionManager = new MovieParser_FunctionManager()
    const button = new MovierParser_Interaction_Components().button
    const button2 = new MovierParser_Interaction_Components().button2

    const user_id = message.author.id
    const user_avatar = message.author.avatarURL()
    if (message.author.bot) return
    if (message.channel.type === "DM") return
    const serverConfig = await mp_databaseManager.getServerConfig(guild_id)
    // const videoParser = await vp_databaseManager.getVideoParserConfig(
    //   message.guild.id
    // );

    // console.log(serverConfig.video_parser);
    // console.log(videoParser);
    /*
      serverConfig -> video_parser enable are allowed to use video parser
    */

    if (
      serverConfig.movie_parser !== null &&
      serverConfig.movie_parser !== "" &&
      serverConfig.movie_parser == message.channel.id
    ) {
      const channel_id = serverConfig.movie_parser
      const keyword = message.content
      const user_avatar = message.author.avatarURL()
      const regex =
        /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\)\\,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/
      const str = message.content
      const url = str.match(regex)
      if (url && url.length > 0 && url[0].includes("themoviedb")) {
        const movie_regex = /http[s]?:\/\/www.themoviedb.org\/(.+)\/(\d+)-?/
        const media_info = url[0].match(movie_regex)
        console.log(media_info)

        await mp_functionManager.sendMediaInfo(
          message,
          channel_id,
          null,
          media_info,
          button,
          button2
        )
      } else {
        await mp_functionManager.sendMediaInfo(
          message,
          channel_id,
          keyword,
          null,
          button,
          button2
        )
      }

      //   let conversationLog = [
      //     {
      //       role: "system",
      //       content:
      //         "你将会被提供一串文字,你的任务是从文字中提取一个电影名字,你不能回复除了提取的电影名字以外的文字以及标点符号,如果文字中没有任何一个电影名字,你就回复false"
      //     }
      //   ];

      //   conversationLog.push({
      //     role: "user",
      //     content: keyword
      //   });
      //   const response_ai = await openai.createChatCompletion({
      //     model: "gpt-3.5-turbo",
      //     messages: conversationLog,
      //     temperature: 0.1
      //   });
      //   console.log(response_ai);
    }
  }
}