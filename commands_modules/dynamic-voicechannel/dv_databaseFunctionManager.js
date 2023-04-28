const sqlite3 = require("sqlite3");
class DynamicVC_DatabaseManager {
    getGuildIds_DynamicVC_Collection() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT Guild_Id FROM DynamicVC_Collection`,function(err, row) {
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

    getDynamicVC_Collection(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT * FROM DynamicVC_Collection WHERE Guild_Id = ?`, [Guild_Id],function(err, rows) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    checkMainChannel_CreatedCount_DynamicVC_Collection(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all('SELECT isAntiMuteChannel, COUNT(*) as count FROM DynamicVC_Collection WHERE Guild_Id = ? GROUP BY isAntiMuteChannel', [Guild_Id], function(err, rows) {
                db.close()
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
    
    updateDynamicVC_Collection_createCount(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`UPDATE DynamicVC_Collection SET subChannel_createdCount = subChannel_createdCount + 1 WHERE Guild_Id = ?`,(Guild_Id), function(err) {
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
    
    deleteDynamicVC_Collection(Guild_Id) { 
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`DELETE FROM DynamicVC_Collection WHERE Guild_Id = ? AND isAntiMuteChannel = 0`, [Guild_Id], function(err) {
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

    deleteDynamicVC_Collection_AntiMute(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`DELETE FROM DynamicVC_Collection WHERE Guild_Id = ? AND isAntiMuteChannel = 1`, [Guild_Id], function(err) {
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

    insertDynamicVC_subId(Guild_Id, subId, isAntiMuteChannel) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.run(`INSERT INTO DynamicVC_subId VALUES (?,?,?)`, [subId, Guild_Id, isAntiMuteChannel], function(err) {
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

    getAntiMute_DynamicVC_subId(Guild_Id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./lib/database/SQLite.db')
            db.all(`SELECT subChannel_Id FROM DynamicVC_subId WHERE Guild_Id = ? AND isAntiMuteChannel = 1`, [Guild_Id],function(err, row) {
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