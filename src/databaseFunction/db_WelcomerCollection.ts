import dbUtils from "@sqlConnection"

  function getGuildIds_Welcomer() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.all("SELECT Guild_Id FROM Welcomer_Collection", function (err, row) {
        db.close()
        if (err) {
          console.error(err.message)
          reject(err)
        } else {
          const guild_Ids = row.map((row) => row.Guild_Id)
          resolve(guild_Ids)
        }
      })
    })
  }

  function getWelcomer_Collection(Guild_Id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.all(
        "SELECT * FROM Welcomer_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err, row) {
          db.close()
          if (err) {
            console.error(err.message)
            reject(err)
          } else {
            resolve(row)
          }
        }
      )
    })
  }

  function insertWelcomer_Collection(SetChannel_Id, Guild_Id, CreateAt, CreateBy) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.run(
        "INSERT INTO Welcomer_Collection VALUES (?,?,?,?,?)",
        [null, SetChannel_Id, Guild_Id, CreateAt, CreateBy],
        function (err) {
          db.close()
          if (err) {
            console.error(err.message)
            reject(err)
          } else {



            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            resolve()
          }
        }
      )
    })
  }

  function deleteWelcomer_Collection(Guild_Id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./src/lib/database/SQLite.db")
      db.run(
        "DELETE FROM Welcomer_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err) {
          db.close()
          if (err) {
            console.error(err.message)
            reject(err)
          } else {
            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            resolve()
          }
        }
      )
    })
  }

  export default {
    getGuildIds_Welcomer,
    getWelcomer_Collection,
    insertWelcomer_Collection,
    deleteWelcomer_Collection,
    }