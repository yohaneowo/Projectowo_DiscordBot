const sqlite3 = require("sqlite3");
class Welcomer_DatabaseManager {
  getGuildIds_Welcomer() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./lib/database/SQLite.db");
      db.all("SELECT Guild_Id FROM Welcomer_Collection", function (err, row) {
        db.close();
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const guild_Ids = row.map((row) => row.Guild_Id);
          resolve(guild_Ids);
        }
      });
    });
  }

  getWelcomer_Collection(Guild_Id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./lib/database/SQLite.db");
      db.all(
        "SELECT * FROM Welcomer_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err, row) {
          db.close();
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  insertWelcomer_Collection(SetChannel_Id, Guild_Id, CreateAt, CreateBy) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./lib/database/SQLite.db");
      db.run(
        "INSERT INTO Welcomer_Collection VALUES (?,?,?,?,?)",
        [null, SetChannel_Id, Guild_Id, CreateAt, CreateBy],
        function (err) {
          db.close();
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  deleteWelcomer_Collection(Guild_Id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./lib/database/SQLite.db");
      db.run(
        "DELETE FROM Welcomer_Collection WHERE Guild_Id = ?",
        [Guild_Id],
        function (err) {
          db.close();
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
module.exports = {
  Welcomer_DatabaseManager
};
