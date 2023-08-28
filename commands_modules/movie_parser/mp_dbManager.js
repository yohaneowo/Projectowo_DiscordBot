const { getDb } = require("../../sqlConnection.js")

class MovieParser_DatabaseManager {
  getServerConfig(guildId) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "SELECT * FROM Server_Config WHERE guild_id = ?"
        )
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
}
module.exports = MovieParser_DatabaseManager
