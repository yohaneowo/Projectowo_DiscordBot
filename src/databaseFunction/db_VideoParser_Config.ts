


import dbUtils from "@sqlConnection"
let db = dbUtils.getDb()
  function getVP_Config(guild_id) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(
          "SELECT * FROM VideoParser_Config WHERE guild_id = ?"
        )
        const video_parser = stmt.get(guild_id)
        // console.log(video_parser)
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



export default getVP_Config
