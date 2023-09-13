const axios = require("axios")
const fs = require("fs")
const tiktok_parser = async (message, regex_result) => {
  const user_id = message.author.id
  message.delete()
  const wait_massage = await message.channel.send({
    content: `<@${user_id}> 请你稍等,正在解析当中...`
  })

  axios
    .get(`http://192.168.31.218:4488/api/hybrid_parsing/${regex_result[0]}`)
    .then((response) => {
      // console.log("response:", response.data);
      const jsonData = response.data
      //   null 表示不使用任何自定义的 replacer，而使用默认的转换行为，即包含所有属性。而使用 2 表示每个级别缩进两个空格。
      // const jsonString = JSON.stringify(jsonData, null, 2)
      // // 保存JSON数据到文件
      // fs.writeFile("data.json", jsonString, "utf8", (err) => {
      //   if (err) {
      //     console.error("保存文件时发生错误:", err)
      //   } else {
      //     console.log("JSON数据已保存到文件dat a.json")
      //   }
      // })

      const video_url = jsonData.video_data.nwm_video_url_HQ
      let video_playCount = jsonData.statistics.play_count
      let video_author = jsonData.author.nickname
      let video_desc = jsonData.desc
      axios
        .get(video_url, { responseType: "stream" })
        .then((response) => {
          const writer = fs.createWriteStream(
            "./lib/video/tiktok_api/video.mp4"
          )
          response.data.pipe(writer)
          return new Promise((resolve, reject) => {
            writer.on("finish", resolve)
            writer.on("error", reject)
          })
        })
        .then(() => {
          var alphabeticStr = video_author.replace(/[^a-zA-Z]/g, "")
          let space = " ".repeat(alphabeticStr.length * 4.2)
          let space2 = " ".repeat(alphabeticStr.length)
          let video_statistic = `===== ╔${space}╗ ======\n作者:${space2}${video_author}${space2}播放量:   ${video_playCount}  [鏈接](${regex_result[0]})\n===== ╚${space}╝ ======`

          const videoPath = "./lib/video/tiktok_api/video.mp4"
          fs.stat(videoPath, (err, stats) => {
            if (err) {
              console.error(err)
              return
            }
            const fileSizeInBytes = stats.size
            const fileSizeInMB = Math.floor(fileSizeInBytes / (1024 * 1024))
            // console.log(fileSizeInMB)
            if (fileSizeInMB < 25) {
              message.channel.send({
                content: `${video_statistic}\n${video_desc}`,
                files: ["./lib/video/tiktok_api/video.mp4"]
              })
              wait_massage.delete()
            } else {
              message.channel.send({
                content: "文件太大,还没做压缩功能"
              })
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}
module.exports = tiktok_parser
