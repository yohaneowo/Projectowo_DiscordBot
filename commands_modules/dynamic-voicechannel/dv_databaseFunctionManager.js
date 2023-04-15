const sqlite3 = require("sqlite3");
class DynamicVC_DatabaseManager {
    getGuildIds_DynamicVC_Stats() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT Guild_Id FROM DynamicVC_Stats`,function(err, row) {
                    db.close()
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        const guild_Ids = row.map(row => row.Guild_Id);
                        resolve(guild_Ids);
                    }
            })
        })
    }

    getDynamicVC_Stats(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT * FROM DynamicVC_Stats WHERE Guild_Id = ?`, [Guild_Id],function(err, row) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

    insertDynamicVC_subId(Guild_Id, subId) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`INSERT INTO DynamicVC_subId VALUES (?,?)`, [subId, Guild_Id], function(err) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    getDynamicVC_subId(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT subChannel_Id FROM DynamicVC_subId WHERE Guild_Id = ?`, [Guild_Id],function(err, row) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    const subIds = row.map(row => row.subChannel_Id);
                    resolve(subIds);
                }
            })
        })
    }

    getGuildIds_DynamicVC_subId() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT Guild_Id FROM DynamicVC_subId`,function(err, row) {
                    db.close()
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        const guild_Ids = row.map(row => row.Guild_Id);
                        resolve(guild_Ids);
                    }
            })
        })
    }

    deleteDynamicVC_subId(subId) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`DELETE FROM DynamicVC_subId WHERE subChannel_Id = ?`, [subId], function(err) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
}
module.exports = {
    DynamicVC_DatabaseManager
};