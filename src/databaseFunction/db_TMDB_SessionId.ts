import dbUtils from "../sqlConnection"
const db = dbUtils.getDb()

export function getSessionId(user_id) {
  return new Promise((resolve, reject) => {
    try {
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

export function insertSessionId(user_id, session_id) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(
        "INSERT INTO TMDB_SessionId (user_id, session_id) VALUES (?, ?)"
      )
      stmt.run(user_id, session_id)

      // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export function updateSessionId(user_id, session_id) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(
        "UPDATE TMDB_SessionId SET session_id = ? WHERE user_id = ?"
      )
      stmt.run(session_id, user_id)

      // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export function deleteSessionId(user_id) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare("DELETE FROM TMDB_SessionId WHERE user_id = ?")
      stmt.run(user_id)

      // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
