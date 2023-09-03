const Genaral_DatabaseManager = require("../commands_modules/general_modules/general_dbManager.js")
const MovierParser_Interaction_Components = require("../commands_modules/movie_parser/mp_component.js")
const MovieParser_FunctionManager = require("../commands_modules/movie_parser/mp_functionManager.js")
const TMDB_SessionId = require("../databaseFunction/TMDB_SessionId.js")

const client = require("../index.js")
require("dotenv").config()
const { EmbedBuilder, ComponentType } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  //   organization: "org-WecKezcKCTAvPKnYCL5UEv3Y",
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
let timer
let lastInitialEmbedMsg

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (!message.guild) return
    const mp_InteractionComponents = new MovierParser_Interaction_Components()
    const mp_databaseManager = new Genaral_DatabaseManager()
    const mp_functionManager = new MovieParser_FunctionManager()
    const guild_id = message.guild.id
    if (message.author.bot) return
    if (message.channel.type === "DM") return
    const displayName = message.member.displayName
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
      let desc
      const channel_id = serverConfig.movie_parser
      const channel = message.guild.channels.cache.get(channel_id)

      const tmdb_SessionId = new TMDB_SessionId()
      const initialEmbedButtonLine1 =
        mp_InteractionComponents.initialEmbedButtonLine1

      const initialEmbed = new EmbedBuilder()
        .setAuthor({
          name: "Project owo",
          iconURL: client.user.avatarURL({ dynamic: true })
        })
        .setTitle("欢迎来到电影区")
        // .setThumbnail("")
        //  .setColor("#FF0000")
        .setTimestamp()
        .setFooter({ text: "Project owo" })
        .setImage(
          "https://cdn.discordapp.com/attachments/876461907840745513/876461936659791902/Untitled.jpg"
        )

      if (message.content.toLowerCase() == "owo") {
        console.log(lastInitialEmbedMsg)
        if (lastInitialEmbedMsg) {
          lastInitialEmbedMsg
            .delete()
            .catch((error) =>
              console.error("Failed to delete the message due to: ", error)
            )
        }

        desc = "owo 聽到你的召喚了!"
        initialEmbed.setDescription(desc)
        lastInitialEmbedMsg = await mp_functionManager.sendInitialEmbedMsg(
          message,
          initialEmbed,
          initialEmbedButtonLine1
        )
        console.log(lastInitialEmbedMsg)
      }
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(async () => {
        let lastMessage = channel.lastMessage
        console.log(lastMessage)
        // console.log(lastMessage)
        if (lastMessage == lastInitialEmbedMsg) return
        console.log(lastInitialEmbedMsg)
        if (lastInitialEmbedMsg) {
          lastInitialEmbedMsg
            .delete()
            .catch((error) =>
              console.error("Failed to delete the message due to: ", error)
            )
        }

        lastInitialEmbedMsg = await mp_functionManager.sendInitialEmbedMsg(
          message,
          initialEmbed,
          initialEmbedButtonLine1
        )
      }, 60000 * 3)

      // message.channel.send({
      //   embeds: [initialEmbed]
      // })
      const user_id = message.author.id
      const sessionId = await tmdb_SessionId.getSessionId(user_id)
      const user_avatar = message.author.avatarURL()
      const regex =
        /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\)\\,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/
      const str = message.content
      const url = str.match(regex)
      if (url && url.length > 0 && url[0].includes("themoviedb")) {
        const movie_regex = /http[s]?:\/\/www.themoviedb.org\/(.+)\/(\d+)-?/
        const media_info = url[0].match(movie_regex)
        console.log(media_info)
        const { media_type, media_data } =
          await mp_functionManager.handleMediaSearch(
            message,
            channel_id,
            null,
            media_info
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
