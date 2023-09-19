

const { json } = require("express")


let { PythonShell } = require("python-shell")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require("fs")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require("path")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'compressVi... Remove this comment to see the full error message
const compressVideo = require("./videoCompressor")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'facebook_p... Remove this comment to see the full error message
const facebook_parser = async (message, URL) => {
  let user_id = message.author.id
  const wait_message = await message.channel.send({
    content: `<@${user_id}> 请你稍等,正在解析当中...`
  })

  let options = {
    pythonOptions: ["-u"], // get print results in real-time

    args: [`${URL}`]
  }

  const messages = await PythonShell.run(
    "./src/python_script/yt-dlp/youtube-dl.py",
    options
  )
  // console.log(messages)
  let video_data = JSON.parse(messages[0])
  let video_title = video_data.title
  let video_desc = video_data.description
  let original_url = video_data.original_url
  let video_duration = video_data.duration
  if (video_duration > 300) {
    message.channel.send({
      content: "视频时长超过5分钟,不要搞我"
    })
    wait_message.delete()
    return
  }

  let filePath = JSON.parse(messages[1]).requested_downloads[0].filepath
  const fileName = path.basename(filePath)
  let video_relativePath = `./src/lib/video/facebook/${fileName}`

  // console.log(`video_title: ${video_title}`)
  // console.log(`video_desc: ${video_desc}`)
  // console.log(`original_url: ${original_url}`)
  // console.log(`filename: ${filePath}`)
  // console.log(`fileName: ${fileName}`)
  // const saveDataAsJson = (data) => {
  //   const jsonData = JSON.stringify(data, null, 2)
  //   fs.writeFile("data.json", jsonData, (err) => {
  //     if (err) {
  //       console.error("保存 JSON 文件时出错：", err)
  //     } else {
  //       console.log("数据已成功保存为 data.json 文件。")
  //     }
  //   })
  // }
  // saveDataAsJson(video_data)
  var alphabeticStr = video_title.replace(/[^a-zA-Z]/g, "")
  let space = " ".repeat(alphabeticStr.length * 4.2)
  let space2 = " ".repeat(alphabeticStr.length)
  let video_statistic = `===== ╔${space}╗ ======\nTitle:${space2}${video_title}${space2} [鏈接](<${original_url}>)\n===== ╚${space}╝ ======`
  fs.stat(filePath, async (err, stats) => {
    if (err) {
      console.error(err)
      return
    }
    const fileSizeInBytes = stats.size
    const fileSizeInMB = Math.floor(fileSizeInBytes / (1024 * 1024))

    if (fileSizeInMB < 25) {
      await message.channel.send({
        content: `${video_statistic}\n${video_desc}`,
        files: [`./src/lib/video/facebook/${fileName}`]
      })
      wait_message.delete()
      message.delete()
    } else {
      wait_message.delete()
      const wait_CompressMesssage = await message.channel.send({
        content: `<@${user_id}> 影片太大了,正在压缩中...`
      })
      const status = await compressVideo(video_relativePath)
      // console.log(status)
      if (status === "done") {
        const finalMsg = await message.channel.send({
          content: `${video_statistic}\n${video_desc}`,
          files: [`./src/lib/video/${fileName}`]
        })
        finalMsg ? message.delete() : null

        if (fs.existsSync(filePath)) {
          // 检查文件权限
          try {
            fs.accessSync(filePath, fs.constants.W_OK)
            console.log(`filePath: ${filePath}`)

            // 文件存在且具有写入权限，进行删除操作
            fs.unlinkSync(filePath)
            fs.unlinkSync(`./src/lib/video/${fileName}`)

            console.log("文件删除成功")
          } catch (err) {
            console.error("文件权限不足，无法删除")
          }
        } else {
          console.error("文件不存在")
        }

        await wait_CompressMesssage.delete()
      }
    }
  })
}



module.exports = facebook_parser
