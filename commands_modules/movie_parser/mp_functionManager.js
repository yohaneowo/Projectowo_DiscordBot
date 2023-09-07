const axios = require("axios")
const { EmbedBuilder, ComponentType, Component } = require("discord.js")
const fs = require("fs")
const path = require("path")
const { createCanvas, loadImage } = require("canvas")
const MovierParser_Interaction_Components = require("./mp_component.js")
const TMDB_ApiFunction = require("./tmdb_apiFunction.js")
const TMDB_SessionId = require("../../databaseFunction/TMDB_SessionId.js")

class MovieParser_FunctionManager {
  constructor(interaction, message) {
    this.interaction = interaction
    this.message = message
  }
  async handleMediaSearch(message, channel_id, keyword, media_info) {
    try {
      const channel = message.guild.channels.cache.get(channel_id)
      const user_avatar = message.author.avatarURL()
      // console.log(media_info)
      channel.sendTyping()
      // message.delete()
      const preMessage = await channel.send("正在查询电影信息...")
      // console.log(button2)
      const tmdb_apiFunction = new TMDB_ApiFunction()
      if (keyword === null) {
        const media_type = media_info[1] || "未知"
        const media_id = media_info[2] || "未知"
        const media_data = await tmdb_apiFunction.getMovieData(
          media_type,
          media_id
        )
        await preMessage.delete()
        return { media_type, media_data }
      } else {
        const media_list = await tmdb_apiFunction.searchMovie(keyword)
        // console.log(media_list)
        if (media_list.results.length === 0) {
          await channel.send("未找到相关电影")
        } else {
          const bigPosterCount = await this.createBigPoster(media_list)
          // console.log(`bigPosterCount: ${bigPosterCount}`)
          // console.log(`OUTSITEtotalResult: ${totalResult}`)
          let pageIndex = 0

          const bufferMessage = await channel.send({
            content: "请稍等..."
          })
          await preMessage.delete()
          const chosenIndex = await this.chooseMedia(
            message,
            channel,
            bigPosterCount,
            pageIndex,
            media_list,
            bufferMessage
          )
          const result = media_list.results[chosenIndex]
          const id = result.id
          const media_type = result.media_type
          const media_data = await tmdb_apiFunction.getMovieData(media_type, id)
          return { media_type, media_data }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async createBigPoster(media_list) {
    return new Promise(async (resolve, reject) => {
      const downloadCount = Math.min(media_list.results.length, 9)
      const iterations = Math.ceil(downloadCount / 3)
      const baseUrl = "https://image.tmdb.org/t/p/"
      const imageSize = "w500"
      let bigPosterCount = 0
      for (let i = 0; i < iterations; i++) {
        const canvasWidth = 1920 // 画布宽度
        const canvasHeight = 750 // 画布高度
        const canvas = createCanvas(canvasWidth, canvasHeight, "png")
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        bigPosterCount++
        for (let j = 0; j < 3; j++) {
          let poster_path = null
          let image404 = false
          if (media_list.results[i * 3 + j]) {
            poster_path = media_list.results[i * 3 + j].poster_path
          } else if (media_list.results[i * 3 + j]?.known_for?.length > 0) {
            poster_path =
              media_list.results[i * 3 + j].known_for[0]?.poster_path
          }

          // console.log(`poster_path: ${poster_path}`)
          let posterUrl = baseUrl + imageSize + poster_path

          let posterIndex = i * 3 + j + 1
          let totalResult = media_list.total_results
          if (poster_path == null && posterIndex < totalResult) {
            image404 = true
            posterUrl = path.join(
              __dirname,
              "../../lib/img/movie_poster/404.png"
            )
          }
          // console.log(`posterUrl: ${poster_path}`)
          // console.log(`posterUrl: ${posterUrl}`)
          if (poster_path !== null || image404) {
            const image = await loadImage(posterUrl)
            const y = (canvasHeight - image.height) / 2
            const x = (canvasWidth - image.width * 3) / 4
            // console.log(`高宽${image.height}, ${image.width}`)
            // console.log(`高宽${x}, ${y}`)
            ctx.drawImage(image, x * (j + 1) + j * image.width, y, 500, 750)
            // ctx.drawImage(image, x * 2 + 500, y, 500, 750)
            // ctx.drawImage(image, x * 3 + 1000, y, 500, 750)
          }
        }
        const downloadPath = path.join(
          __dirname,
          `../../lib/img/movie_poster/bigPoster${i}.jpg`
        )
        const fs = require("fs")
        const out = fs.createWriteStream(downloadPath)
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on("finish", () => {
          if (bigPosterCount === iterations) {
            resolve(bigPosterCount) // 所有海报生成完成，调用resolve()并传递生成的海报数量
          }
        })
      }
    })

    // console.log(media_list)
    // return bigPosterCount
  }

  async chooseMedia(
    message,
    channel,
    bigPosterCount,
    pageIndex,
    media_list,
    bufferMessage
  ) {
    const chooseButton = new MovierParser_Interaction_Components().chooseButton
    const pageCountButton = new MovierParser_Interaction_Components().pageButton
    pageCountButton.components[0].setLabel(`${pageIndex + 1}/${bigPosterCount}`)
    let totalResult = media_list.total_results
    let lastPage_index = bigPosterCount - 1
    // console.log(media_list)
    // console.log(`INSIDECHOSEtotalResult: ${totalResult}`)
    pageIndex === 0
      ? chooseButton.components[0].setDisabled(true)
      : chooseButton.components[0].setDisabled(false)
    pageIndex === lastPage_index
      ? chooseButton.components[4].setDisabled(true)
      : chooseButton.components[4].setDisabled(false)

    if (bigPosterCount === 1) {
      chooseButton.components[0].setDisabled(true)
      chooseButton.components[4].setDisabled(true)
    }
    console.log(media_list.total_results)

    if (pageIndex === lastPage_index) {
      console.log(media_list.total_results)

      console.log(`totalResult: ${totalResult}`)
      console.log(`bigPosterCount: ${bigPosterCount}`)
      console.log(
        `totalResult % bigPosterCount: ${totalResult % bigPosterCount}`
      )
      const remainingMediaCount = Math.min(totalResult, 9) % bigPosterCount
      if (remainingMediaCount === 1) {
        chooseButton.components[3].setDisabled(true)
      } else if (remainingMediaCount === 2) {
        chooseButton.components[2].setDisabled(true)
        chooseButton.components[3].setDisabled(true)
      }
      console.log(`remainingMediaCount: ${remainingMediaCount}`)
      // const lastPageMediaCount =
      //   remainingMediaCount === 0 ? bigPosterCount : remainingMediaCount
    }
    // console.log(`pageIndex: ${pageIndex}`)
    const new_Path = path.join(
      __dirname,
      `../../lib/img/movie_poster/bigPoster${pageIndex}.jpg`
    )
    const response = await channel.send({
      content: "请选择电影",
      components: [pageCountButton, chooseButton],
      files: [new_Path]
    })
    bufferMessage.delete()

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 300_000
    })
    return new Promise((resolve) => {
      collector.on("collect", async (i) => {
        if (i.customId === "leftArrow") {
          pageIndex = Math.max(0, pageIndex - 1)
          response.delete()
          const bufferMessage = await channel.send({
            content: "请稍等..."
          })
          resolve(
            this.chooseMedia(
              message,
              channel,
              bigPosterCount,
              pageIndex,
              media_list,
              bufferMessage
            )
          )
        } else if (i.customId === "rightArrow") {
          pageIndex = Math.min(2, pageIndex + 1)
          response.delete()
          const bufferMessage = await channel.send({
            content: "请稍等..."
          })
          resolve(
            this.chooseMedia(
              message,
              channel,
              bigPosterCount,
              pageIndex,
              media_list,
              bufferMessage
            )
          )
        } else if (i.customId === "one") {
          response.delete()
          resolve(0 + pageIndex * 3)

          // return 0 + pageIndex * 3
        } else if (i.customId === "two") {
          response.delete()
          resolve(1 + pageIndex * 3)

          // return 1 + pageIndex * 3
        } else if (i.customId === "three") {
          response.delete()
          resolve(2 + pageIndex * 3)

          // return 2 + pageIndex * 3
        }
      })
    })
  }

  async convertEmbed(
    media_type,
    media_data,
    user_avatar,
    displayName,
    sessionId
  ) {
    try {
      if (media_type === "movie") {
        const media_title_zh = media_data.title
        const media_title_en = media_data.original_title
        const media_id = media_data.id
        const movie_poster = media_data.poster_path
        const movie_release_date = media_data.release_date
        const minutes = media_data.runtime
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        const movie_runtime = `${hours}小时 ${remainingMinutes}分钟`
        const embed = new EmbedBuilder()

          .setTitle(`${media_title_zh} `)
          .setURL(`https://www.themoviedb.org/${media_type}/${media_id}`)
          .setDescription(`${media_title_en}`)
          .addFields(
            {
              name: "首映日期",
              value: `${movie_release_date}`,
              inline: true
            },
            {
              name: "电影时长",
              value: `${movie_runtime}`,
              inline: true
            }
          )
          .setImage(`https://image.tmdb.org/t/p/original${movie_poster}`)
          .setThumbnail(`${user_avatar}`)
          .setColor("#7F8C8D")
          .setTimestamp()
        if (sessionId) {
          const tmdb_apiFunction = new TMDB_ApiFunction()
          // They named it account_status somehow
          const account_states = await tmdb_apiFunction.getAccountStates(
            sessionId,
            media_data.id
          )
          if (account_states.rated != false) {
            const singleStar = "🌕"
            const halfStar = "🌗"
            const emptyStar = "🌑"
            const rating = account_states.rated.value
            let starFloor = Math.floor(rating / 2)
            let starQuotient = rating % 2
            let emptyStarCount = 5 - starFloor - starQuotient
            // convert rating 1-10 to stars
            let starString = `${singleStar.repeat(starFloor)}${halfStar.repeat(
              Math.ceil(starQuotient)
            )}${emptyStar.repeat(emptyStarCount)}`

            embed.setAuthor({
              name: `${displayName} 评分: ${starString}`,
              iconURL: `${user_avatar}`
            })
          }
        }

        return embed
      } else if (media_type === "tv") {
        return null
      }
    } catch (e) {
      console.log(e)
    }
  }
  async sendMediaInfo(channel, embed) {
    try {
      const response = await channel.send({
        embeds: [embed]
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }

  async sendRatingForm(message, channel, embed, mediaInfoMsg) {
    const mp_InteractionComponents = new MovierParser_Interaction_Components()
    const ratingButtonLine1 = mp_InteractionComponents.ratingButtonLine1
    const ratingButtonLine2 = mp_InteractionComponents.ratingButtonLine2
    const voteButton = mp_InteractionComponents.voteButton

    try {
      await mediaInfoMsg.edit({
        components: [ratingButtonLine1, ratingButtonLine2],
        embeds: [embed]
      })

      const collectorFilter = (i) => i.user.id === message.author.id

      const collector = mediaInfoMsg.createMessageComponentCollector({
        filter: collectorFilter,
        componentType: ComponentType.Button,
        time: 300_000
      })

      let ratingScore = 0
      const stars = [
        { value: 0.5, active: false },
        { value: 1, active: false },
        { value: 2, active: false },
        { value: 3, active: false },
        { value: 4, active: false },
        { value: 5, active: false }
      ]
      return new Promise((resolve) => {
        collector.on("collect", async (i) => {
          // console.log(i)
          await i.deferUpdate()

          const star = stars.find((s) => s.value.toString() === i.customId)
          if (star) {
            // confirming button pressed
            star.active = !star.active
            // score calculate
            ratingScore += star.active ? star.value : -star.value
            // console.log(`userScore: ${userScore}`)
            // console.log(`star.value: ${star.value}`)

            // disable other button if a button is pressed
            if (ratingScore >= 1) {
              for (let i = 0; i < 5; i++) {
                if (stars[i + 1].active === false) {
                  // console.log(`i check: ${i}`)
                  // console.log(`stars[i].active: ${stars[i].active}`)
                  // console.log(`stars[i].value: ${stars[i].value}`)
                  ratingButtonLine1.components[i].setDisabled(true)
                }
              }
            }

            // enable button when score below 0.5
            if (ratingScore <= 0.5) {
              ratingButtonLine1.components[0].setDisabled(false)
              ratingButtonLine1.components[1].setDisabled(false)
              ratingButtonLine1.components[2].setDisabled(false)
              ratingButtonLine1.components[3].setDisabled(false)
              ratingButtonLine1.components[4].setDisabled(false)
              ratingButtonLine2.components[0].setDisabled(false)
              if (ratingScore == 0.5 && stars[0].active === true) {
                // disable button 5 star when score equal 0.5
                ratingButtonLine1.components[4].setDisabled(true)
              }
              // disable button 0.5 star when score equal 5
            } else if (ratingScore === 5) {
              ratingButtonLine2.components[0].setDisabled(true)
            }

            // console.log(`star.value22: ${star.value}`)
            ratingButtonLine2.components[1].setLabel(`${ratingScore}⭐`)
            await i.editReply({
              components: [ratingButtonLine1, ratingButtonLine2]
            })
          }
          // console.log(i)
          // console.log(button2.components[1].data.label)
          if (i.customId == "confirm" && ratingScore > 0) {
            await mediaInfoMsg.edit({
              components: [voteButton]
            })
          } else if (i.customId == "confirm" && ratingScore <= 0) {
            const errMsg = await channel.send({
              content: "你没有评分就按确定,你是要触发bug吗?!!?!?"
            })
            setTimeout(() => {
              errMsg.delete()
            }, 3000) //
          } else if (i.customId == "cancel") {
            await mediaInfoMsg.edit({
              components: []
            })
          } else if (i.customId == "cancel2") {
            await mediaInfoMsg.delete()
          }
          if (i.customId == "good") {
            await mediaInfoMsg.edit({
              components: []
            })
            channel.send({
              content: `${message.author} **顶**了这个电影,并评分 ${ratingScore}⭐`,
              component: []
            })
            resolve(ratingScore)
          } else if (i.customId == "bad") {
            await mediaInfoMsg.edit({
              components: []
            })
            channel.send({
              content: `${message.author} **踩**了这个电影,并评分 ${ratingScore}⭐`,
              component: []
            })
            resolve(ratingScore)
          }
        })
        collector.on("end", async () => {
          // if (i.size === 0) {
          // 用户没有进行选择
          if (mediaInfoMsg.length > 0) {
            await mediaInfoMsg.edit({
              components: []
            })
          }
          // }
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  async sendInitialEmbedMsg(message, initialEmbed, initialEmbedButtonLine1) {
    const response = await message.channel.send({
      embeds: [initialEmbed],
      components: [initialEmbedButtonLine1]
    })
    return response
  }

  async convertEmbedSendMediaInfoAndSendRatingForm(
    searchedData,
    user_info,
    interaction_params
  ) {
    const { media_type, media_data } = searchedData
    const { sessionId, user_avatar, displayName } = user_info
    const { message, channel } = interaction_params
    const embed = await this.convertEmbed(
      media_type,
      media_data,
      user_avatar,
      displayName,
      sessionId
    )
    const mediaInfoMsg = await this.sendMediaInfo(channel, embed)
    const ratingScore = await this.sendRatingForm(
      message,
      channel,
      embed,
      mediaInfoMsg
    )
    return ratingScore
  }

  async handleResetSessionIdConfirmation(
    confirmationResponse,
    tmdb_AuthenticationEmbed
  ) {
    const tmdb_SessionId = new TMDB_SessionId()
    const tmdb_apiFunction = new TMDB_ApiFunction()
    let custom_desc
    let custom_color
    const user_id = this.interaction.user.id
    try {
      const collectorFilter = (i) => i.user.id === this.interaction.user.id
      const confirmationButton =
        await confirmationResponse.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000
        })

      if (confirmationButton.customId === "confirm") {
        confirmationButton.deferUpdate()
        custom_desc = "已重置授权"
        custom_color = "#FF0000"
        tmdb_AuthenticationEmbed.setDescription(custom_desc)
        tmdb_AuthenticationEmbed.setColor(custom_color)
        await tmdb_SessionId.deleteSessionId(user_id)
        await this.interaction.editReply({
          embeds: [tmdb_AuthenticationEmbed],
          components: []
        })
        await tmdb_SessionId.deleteSessionId(user_id)
        await tmdb_apiFunction.sendAuthRequestLink(this.interaction, null)
        // await response.delete()
      } else if (confirmationButton.customId === "cancel") {
        confirmationButton.deferUpdate()
        custom_desc = "**已取消`重置授权`**"
        custom_color = "#FF0000"
        tmdb_AuthenticationEmbed.setDescription(custom_desc)
        tmdb_AuthenticationEmbed.setColor(custom_color)
        await this.interaction.editReply({
          embeds: [tmdb_AuthenticationEmbed],
          components: []
        })
      }
    } catch (error) {
      this.interaction.deleteReply()
      // // console.log(error)
    }
  }

  async handleDeleteSessionIdConfirmation(
    confirmationResponse,
    tmdb_AuthenticationEmbed
  ) {
    let custom_desc
    let custom_color
    const tmdb_SessionId = new TMDB_SessionId()
    const user_id = this.interaction.user.id
    const collectorFilter = (i) => i.user.id === this.interaction.user.id
    const confirmationButton = await confirmationResponse.awaitMessageComponent(
      {
        filter: collectorFilter,
        time: 60_000
      }
    )
    try {
      if (confirmationButton.customId === "confirm") {
        confirmationButton.deferUpdate()

        custom_desc = "**已刪除授权**"
        custom_color = "#FF0000"

        confirmationButton.deferUpdate()

        tmdb_AuthenticationEmbed.setDescription(custom_desc)
        tmdb_AuthenticationEmbed.setColor(custom_color)

        await tmdb_SessionId.deleteSessionId(user_id)
        await this.interaction.editReply({
          embeds: [tmdb_AuthenticationEmbed],
          components: []
        })
      } else if (confirmationButton.customId === "cancel") {
        confirmationButton.deferUpdate()
        custom_desc = "**已取消`刪除授权`**"
        custom_color = "#FF0000"
        tmdb_AuthenticationEmbed.setDescription(custom_desc)
        tmdb_AuthenticationEmbed.setColor(custom_color)
        await this.interaction.editReply({
          embeds: [tmdb_AuthenticationEmbed],
          components: []
        })
      }
    } catch (error) {
      this.interaction.deleteReply()
      // // console.log(error)
    }
  }
}

module.exports = MovieParser_FunctionManager
