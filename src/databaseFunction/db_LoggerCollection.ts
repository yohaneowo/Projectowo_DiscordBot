import dbUtils from "@sqlConnection"
let db = dbUtils.getDb()
export function getGuildIds_LoggerCollection() {
  return new Promise(function (resolve, reject) {
    try {
      const stmt = db.prepare("SELECT guild_id FROM Logger_Collection")
      const guild_Ids = stmt.all().map((row) => row.guild_id)
      console.log(guild_Ids)
      resolve(guild_Ids)
      stmt.finalize()
      // console.log(guild_Ids)
    } catch (err) {
      reject(err)
    }
  })
}

export function getSelectValues_LoggerCollection(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      let stmt = db
        .prepare(
          "SELECT Select_Menu_Values FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      console.log(stmt.Select_Menu_Values)
      resolve(stmt.Select_Menu_Values)
    } catch (err) {
      reject(err)
    }
  })
}

export function getChannelIds_LoggerCollection(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const channel_Ids = db
        .prepare("SELECT * FROM Logger_Collection WHERE Guild_Id = ?")
        .get(guild_id)
      if (channel_Ids) {
        resolve(channel_Ids)
      } else {
        resolve(null)
      }
    } catch (err) {
      reject(err)
    }
  })
}
export function getCategoryChannelId_LoggerCollection(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const categoryChannelId = db
        .prepare(
          "SELECT categoryChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (categoryChannelId) {
        resolve(categoryChannelId.categoryChannelId)
      } else {
        resolve(null)
      }
    } catch (err) {
      reject(err)
      console.log(err)
    }
  })
}
export function getMemberLogsChannelId_LoggerCollection(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const memberLogsChannelIds = db
        .prepare(
          "SELECT memberLogsChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (memberLogsChannelIds) {
        console.log(`memberLogsChannelIds: ${memberLogsChannelIds}`)
        resolve(memberLogsChannelIds.memberLogsChannelId)
      } else {
        resolve(null)
      }
    } catch (err) {
      reject(err)
      console.log(err)
    }
  })
}

export function getServerLogsChannelId(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const serverLogsChannelId = db
        .prepare(
          "SELECT serverLogsChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (serverLogsChannelId) {
        resolve(serverLogsChannelId.serverLogsChannelId)
      } else {
        resolve(null)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

export function getJoinLeaveLogsChannelId(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const joinLeaveLogsChannelId = db
        .prepare(
          "SELECT joinLeaveLogsChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (joinLeaveLogsChannelId) {
        //  column name joinleave not jojnleave
        resolve(joinLeaveLogsChannelId.joinleaveLogsChannelId)
      } else {
        resolve(null)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

export function getMessageLogsChannelId(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const messageLogsChannelId = db
        .prepare(
          "SELECT messageLogsChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (messageLogsChannelId) {
        resolve(messageLogsChannelId.messageLogsChannelId)
      } else {
        resolve(null)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

export function getVoiceLogsChannelId(guild_id) {
  return new Promise(function (resolve, reject) {
    try {
      const voiceLogsChannelId = db
        .prepare(
          "SELECT voiceLogsChannelId FROM Logger_Collection WHERE Guild_Id = ?"
        )
        .get(guild_id)
      if (voiceLogsChannelId) {
        resolve(voiceLogsChannelId.voiceLogsChannelId)
      } else {
        resolve(null)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

export function insert_Logger_Collection(
  Guild_Id,
  Category_Id,
  default_logs_Id,
  member_logs_Id,
  server_logs_Id,
  voice_logs_Id,
  message_logs_Id,
  joinLeave_logs_Id,
  Select_Menu_Values
) {
  return new Promise(function (resolve, reject) {
    const db = new sqlite3.Database("./src/lib/database/SQLite.db")
    db.run(
      "INSERT INTO Logger_Collection VALUES (?,?,?,?,?,?,?,?,?,?) ",
      [
        null,
        Guild_Id,
        Category_Id,
        default_logs_Id,
        member_logs_Id,
        server_logs_Id,
        voice_logs_Id,
        message_logs_Id,
        joinLeave_logs_Id,
        Select_Menu_Values
      ],
      function (err) {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

export function delete_Logger_Collection(Guild_Id) {
  return new Promise(function (resolve, reject) {
    const db = new sqlite3.Database("./src/lib/database/SQLite.db")
    db.run(
      "DELETE FROM Logger_Collection WHERE Guild_Id = ?",
      [Guild_Id],
      function (err) {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
