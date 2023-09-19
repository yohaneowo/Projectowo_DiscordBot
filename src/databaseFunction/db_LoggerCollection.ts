import dbUtils from "@sqlConnection"
let db = dbUtils.getDb()
function getGuildIds_LoggerCollection() {
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

function getSelectValues_Logger_Collection(Guild_Id) {
    return new Promise(function (resolve, reject) {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.all(
        "SELECT Select_Menu_Values FROM Logger_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err, rows) {
          db.close()
          if (err) {
            reject(err)
          } else {
            const selectValues = rows.map((row) => row.Menu_Select_Values)
            resolve(selectValues)
          }
        }
      )
    })
  }

function getChannelIds_Logger_Collection(Guild_Id) {
    return new Promise(function (resolve, reject) {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.all(
        "SELECT * FROM Logger_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err, rows) {
          db.close()
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        }
      )
    })
  }

function getMemberLogs_Ids_Logger_Collection() {
    return new Promise(function (resolve, reject) {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.all(
        "SELECT memberLogsChannelId FROM Logger_Collection",
        [],
        function (err, rows) {
          db.close()
          if (err) {
            reject(err)
          } else {
            const memberLogs_Ids = rows.map((row) => row.member_logs_Id)
            resolve(memberLogs_Ids)
          }
        }
      )
    })
  }

function insert_Logger_Collection(
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

function delete_Logger_Collection(Guild_Id) {
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

  export default {
    getGuildIds_LoggerCollection,
    getSelectValues_Logger_Collection,
    getChannelIds_Logger_Collection,
    getMemberLogs_Ids_Logger_Collection,
    insert_Logger_Collection,
    delete_Logger_Collection
    }
