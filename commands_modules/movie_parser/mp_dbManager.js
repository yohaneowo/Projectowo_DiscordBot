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

  insertSessionId(user_id, session_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "INSERT INTO TMDB_Session (user_id, session_id) VALUES (?, ?)"
        )
        stmt.run(user_id, session_id)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  getSessionId(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "SELECT session_id FROM TMDB_Session WHERE user_id = ?"
        )
        const session_id = stmt.get(user_id)
        // console.log("session_id: ", session_id);

        if (session_id) {
          resolve(session_id)
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  updateSessionId(user_id, session_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "UPDATE TMDB_Session SET session_id = ? WHERE user_id = ?"
        )
        stmt.run(session_id, user_id)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  deleteSessionId(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare("DELETE FROM TMDB_Session WHERE user_id = ?")
        stmt.run(user_id)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}
module.exports = MovieParser_DatabaseManager
