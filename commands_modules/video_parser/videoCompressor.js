const ffmpeg = require("fluent-ffmpeg")
const fs = require("fs")
const path = require("path")

const compressVideo = async (video_path) => {
  const fileName = path.basename(video_path)

  // let video_path =
  //   "lib/video/facebook/facebook_f754e58c7f6d401442942a56e4058604.mp4"
  // "C:\\Users\\Yohane\\Documents\\GitHub\\DiscordBot-Project_uwu\\lib\\video\\facebook\\facebook_f754e58c7f6d401442942a56e4058604.mp4"
  const getVideoMetadata = (videoPath) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err)
          return
        }

        const fileSize = fs.statSync(videoPath).size
        const duration = metadata.format.duration
        resolve({ fileSize, duration })
      })
    })
  }

  const { fileSize, duration } = await getVideoMetadata(video_path)

  let targetSize = 25 * 1000 * 8 // 25MB
  let audio_bitrate = 32 * 1000
  // console.log("targetSize:", targetSize)

  let video_bitrate = Math.round((targetSize - audio_bitrate) / duration)
  // console.log("audio_bitrate:", audio_bitrate)
  // console.log("video_bitrate:", video_bitrate)

  return new Promise((resolve, reject) => {
    ffmpeg(video_path)
      .videoCodec("libx264")
      .videoBitrate(video_bitrate)
      // .addOption("-pass", "1")
      .noAudio()
      .output(`./lib/video/${fileName}`)
      .on("end", () => {
        // Pass 2
        ffmpeg(video_path)
          .videoCodec("libx264")

          .videoBitrate(video_bitrate)
          .audioCodec("aac")
          .audioBitrate("32k")
          // .addOption("-pass", "2")
          .output(`./lib/video/${fileName}`)
          .on("end", () => {
            console.log("压缩完成")
            resolve("done")
          })
          .run()
      })
      .run()
  })
}

module.exports = compressVideo
