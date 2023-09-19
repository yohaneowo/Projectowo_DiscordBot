


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require("sqlite3").verbose()



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getDb'.
const { getDb, closeDb } = require("../../sqlConnection.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
class Logger_DatabaseFunction {
  getGuild_Ids_Logger_Collection() {
    return new Promise(function (resolve, reject) {
      try {
        const db = getDb()
        const stmt = db.prepare("SELECT * FROM Logger_Collection")
        const guild_Ids = stmt.all().map((row) => {
          return row.Guild_Id
        })
        resolve(guild_Ids)
        stmt.finalize()



        // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
        closeDb(db)
        // console.log(guild_Ids)
      } catch (err) {
        reject(err)
      }
    })
  }

  // getGuild_Ids_Logger_Collection() {
  //     return new Promise(function (resolve, reject) {
  //         const db = new sqlite3.Database('./src/lib/database/SQLite.db');
  //         db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Logger_Collection', [], function (err, rows) {
  //             db.close();
  //                 if (err) {
  //                     reject(err);
  //                 } else {
  //                     const guild_Ids = rows.map(row => row.Guild_Id);
  //                     resolve(guild_Ids);
  //                 }
  //             }
  //         )
  //     })
  // }

  getSelectValues_Logger_Collection(Guild_Id) {
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

  getChannelIds_Logger_Collection(Guild_Id) {
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

  getMemberLogs_Ids_Logger_Collection() {
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

  insert_Logger_Collection(
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



            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            resolve()
          }
        }
      )
    })
  }

  delete_Logger_Collection(Guild_Id) {
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



            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            resolve()
          }
        }
      )
    })
  }
}



module.exports = {
  Logger_DatabaseFunction
}
