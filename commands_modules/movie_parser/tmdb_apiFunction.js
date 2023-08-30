const axios = require("axios")
require("dotenv").config()
const MovierParser_Interaction_Components = require("../../commands_modules/movie_parser/mp_component.js")

class TMDB_ApiFunction {
  async createRequestToken() {
    console.log(process.env.TMDB_API_KEY)
    const url = "https://api.themoviedb.org/3/authentication/token/new"
    const params = {
      api_key: process.env.TMDB_API_KEY
    }

    try {
      const response = await axios.get(url, { params })
      //   console.log(response.data)
      return response.data
    } catch (error) {
      console.error("error:" + error)
      throw error
    }
  }

  async sendAuthRequestLink(interaction, message) {
    const authConfirmButton = new MovierParser_Interaction_Components()
      .authConfirmButton
    const response_data = await this.createRequestToken()
    let request_token = response_data.request_token
    if (interaction !== null) {
      const response = await interaction.user.send({
        content: `点击以下网址跳转TMDB官网进行授权, \n 完成后请点击确认 \n ==================================\n https://www.themoviedb.org/authenticate/${request_token} \n ==================================`,
        components: [authConfirmButton]
      })

      const collectorFilter = (i) => i.user.id === interaction.user.id
      try {
        const confirmation = await response.awaitMessageComponent({
          filter: collectorFilter,
          time: 60000
        })

        if (confirmation.customId === "confirm") {
          this.getUserApi(request_token)
        } else if (confirmation.customId === "cancel") {
          response.edit({
            content: "已取消",
            components: []
          })
        }
      } catch (e) {
        console.log(e)
        await interaction.editReply({
          content: "Confirmation not received within 1 minute, cancelling",
          components: []
        })
      }
    }
  }
  //   async getUserApi(request_token) {
  //     const url = `https://www.themoviedb.org/authenticate/${request_token}/allow`
  //     // const params = {
  //     //   api_key: process.env.TMDB_API_KEY
  //     // }

  //     try {
  //       const response = await axios.get(url)
  //       console.log(response)
  //       return response
  //     } catch (error) {
  //       console.error("error:" + error)
  //       throw error
  //     }
  //   }
}
module.exports = TMDB_ApiFunction
