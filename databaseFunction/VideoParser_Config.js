const { getDb } = require("../sqlConnection.js")

class VideoParser_Config {
  getVP_Config(guild_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "SELECT * FROM VideoParser_Config WHERE guild_id = ?"
        )
        const video_parser = stmt.get(guild_id)
        console.log(video_parser)
        if (video_parser) {
          resolve(video_parser)
        } else {
          resolve(null)
        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}

module.exports = VideoParser_Config
