const axios = require("axios")
require("dotenv").config()
const MovierParser_Interaction_Components = require("../../commands_modules/movie_parser/mp_component.js")
const eventManager = require("../../handlers/CustomEvent")
const { EmbedBuilder } = require("discord.js")
const TMDB_SessionId = require("../../databaseFunction/TMDB_SessionId.js")

class TMDB_ApiFunction {
  constructor() {
    this.TMDB_API_KEY = process.env.TMDB_API_KEY
  }

  async createRequestToken() {
    // console.log(process.env.TMDB_API_KEY)
    const apiUrl = "https://api.themoviedb.org/3/authentication/token/new"
    const params = {
      api_key: this.TMDB_API_KEY
    }

    try {
      const response = await axios.get(apiUrl, { params })
      //   console.log(response.data)
      return response.data
    } catch (error) {
      console.error("error:" + error)
      throw error
    }
  }
  // async authRequestCombination(interaction) {
  //   const pre_msg = await interaction.editReply({
  //     content: "已发送授权链接，请查收",
  //     ephemeral: true
  //   })
  //   setTimeout(() => {
  //     interaction.deleteReply()
  //   }, 3000)
  //   await this.sendAuthRequestLink(interaction, null, pre_msg)
  // }

  async sendAuthRequestLink(interaction, message) {
    const pre_msg = await interaction.editReply({
      content: "已发送授权链接，请查收",
      ephemeral: true
    })
    // setTimeout(() => {
    //   interaction.deleteReply()
    // }, 3000)

    const response_data = await this.createRequestToken()
    let user = interaction.user || message.author
    let request_token = response_data.request_token
    const userId = interaction.user.id
    let authLink = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://dowouwu.com/auth/TMDB_Auth/${userId}`
    let content = `点击以下网址跳转TMDB官网进行授权 \n ==================================\n ${authLink} \n ==================================`

    const embed = new EmbedBuilder()
      .setTitle("TMDB Authentication")
      .setDescription(content)
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1146652474363609210/1146652578491412490/tmdb.png"
      )
      .setColor("#4682B4")
      .setFooter({ text: "Project UwU" })

    if (interaction !== null) {
      const msg = await user.send({
        // content: content
        embeds: [embed]
      })
      pre_msg.delete()
      this.sendAuthResultMessage(interaction, null, msg)
    } else if (message !== null) {
      const msg = await user.send({
        // content: content
        embeds: [embed]
      })
      pre_msg.delete()
      this.sendAuthResultMessage(null, message, msg)
    }
  }

  async sendAuthResultMessage(interaction, message, msg) {
    let user = interaction.user || message.author
    if (user !== null) {
      eventManager.on("TMDB_authentication", async (data) => {
        const { status, triggeredBy, request_token } = data
        console.log(status, triggeredBy, request_token)
        // console.log(request_token)

        let desc = status === "approved" ? "**认证通过**" : "**认证被拒绝**"
        let color = status === "approved" ? "#00FF00" : "#FF0000"
        const embed = new EmbedBuilder()
          .setTitle("TMDB Authentication")
          .setDescription(desc)
          .setColor(color)
          .setTimestamp()
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1146652474363609210/1146652578491412490/tmdb.png"
          )
          .setFooter({ text: "Project UwU" })

        if (status === "approved") {
          // 认证通过
          // const botMessage = `TMDB 认证通过！触发者：${triggeredBy}, status: ${status}`
          await this.createSessionId(triggeredBy, request_token)
          await user.send({
            // content: botMessage,
            embeds: [embed]
          })
          msg.delete()
          // ...
        } else if (status === "denied") {
          // 认证被拒绝
          // const botMessage = `TMDB 认证被拒绝！触发者：${triggeredBy}, status: ${status}`
          await user.send({
            // content: botMessage,
            embeds: [embed]
          })
          msg.delete()

          // ...
        }

        // ...
      })
    }
  }

  async searchMovie(keyword) {
    try {
      const renponse = await axios.get(
        "https://api.themoviedb.org/3/search/multi",
        {
          params: {
            language: "zh-CN",
            query: keyword,
            api_key: process.env.TMDB_API_KEY
          }
        }
      )
      return renponse.data
    } catch (e) {
      console.log(e)
    }
  }

  async getMovieData(media_type, movie_id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${movie_id}`,
        {
          params: {
            language: "zh-CN",
            api_key: process.env.TMDB_API_KEY
          }
        }
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async createSessionId(user_id, request_token) {
    try {
      const tmdb_SessionId = new TMDB_SessionId()
      const apiUrl = "https://api.themoviedb.org/3/authentication/session/new"
      const response = await axios.get(apiUrl, {
        params: {
          api_key: this.TMDB_API_KEY,
          request_token: request_token
        }
        // headers: {
        //   Authorization: `Bearer ${sessionId}`
        // }
      })
      const session_id = response.data.session_id
      // 处理 API 响应数据
      tmdb_SessionId.insertSessionId(user_id, session_id)
    } catch (error) {
      // 处理错误
      console.error(error)
    }
  }

  async addRating(session_id, movie_id, ratingScore) {
    ratingScore = ratingScore * 2
    const apiUrl = `https://api.themoviedb.org/3/movie/${movie_id}/rating`
    const headers = {
      "Content-Type": "application/json;charset=utf-8"
    }
    const data = {
      value: ratingScore
    }
    const params = {
      api_key: this.TMDB_API_KEY,
      session_id: session_id
    }

    axios
      .post(apiUrl, data, { headers: headers, params: params })
      .then((response) => {
        if (response.status === 201) {
          console.log("评分成功")
        } else {
          console.log("评分失败")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getAccountStates(session_id, movie_id) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movie_id}/account_states`
    const params = {
      api_key: this.TMDB_API_KEY,
      session_id: session_id
    }
    try {
      const response = await axios.get(apiUrl, { params: params })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = TMDB_ApiFunction
