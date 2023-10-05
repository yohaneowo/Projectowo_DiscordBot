import dbUtils from "@sqlConnection"

function getServerConfig(guildId) {
  return new Promise((resolve, reject) => {
    let db = dbUtils.getDb()

    try {
      const stmt = db.prepare("SELECT * FROM ServerConfig WHERE guild_id = ?")
      const serverConfig = stmt.get(guildId)
      // console.log("serverConfig: ", serverConfig);

      if (serverConfig) {
        resolve(serverConfig)
      }
    } catch (err) {
      reject(err)
    }
  })
}

export default {
  getServerConfig
}
