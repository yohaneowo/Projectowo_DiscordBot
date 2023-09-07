const { getDb } = require("../sqlConnection.js")

class TMDB_SessionId {
  getSessionId(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "SELECT session_id FROM TMDB_SessionId WHERE user_id = ?"
        )
        const session_id = stmt.get(user_id)
        // console.log("session_id: ", session_id)

        if (session_id) {
          resolve(session_id.session_id)
        } else {
          resolve(null)
        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }

  insertSessionId(user_id, session_id) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb()
        const stmt = db.prepare(
          "INSERT INTO TMDB_SessionId (user_id, session_id) VALUES (?, ?)"
        )
        stmt.run(user_id, session_id)
        resolve()
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
          "UPDATE TMDB_SessionId SET session_id = ? WHERE user_id = ?"
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
        const stmt = db.prepare("DELETE FROM TMDB_SessionId WHERE user_id = ?")
        stmt.run(user_id)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = TMDB_SessionId
