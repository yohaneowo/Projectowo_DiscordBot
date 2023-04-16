const sqlite3 = require('sqlite3').verbose();
class Logger_DatabaseFunction {
    getGuild_Ids_Logger_Collection() {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database('./lib/database/SQLite.db');
            db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Logger_Collection', [], function (err, rows) {
                db.close();
                    if (err) {
                        reject(err);
                    } else {
                        const guild_Ids = rows.map(row => row.Guild_Id);
                        resolve(guild_Ids);
                    }
                }
            )
        })
    }

    getSelectValues_Logger_Collection(Guild_Id) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database('./lib/database/SQLite.db');
            db.all('SELECT Menu_Select_Values FROM Logger_Collection WHERE Guild_Id = ?', [Guild_Id], function (err, rows) {
                db.close();
                    if (err) {
                        reject(err);
                    } else {
                        const selectValues = rows.map(row => row.Menu_Select_Values);
                        resolve(selectValues);
                    }
                }
            )
        })
    }

    getChannelIds_Logger_Collection(Guild_Id) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database('./lib/database/SQLite.db');
            db.all('SELECT * FROM Logger_Collection WHERE Guild_Id = ?', [Guild_Id], function (err, rows) {
                db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            )
        })
    }   

    insert_Logger_Collection(Guild_Id, Category_Id, channelCreate_Id, channelUpdate_Id, channelDelete_Id, guildBanAdd_Id, guildBanRemove_Id, guildRoleCreate_Id, guildRoleDelete_Id, guildRoleUpdate_Id, guildUpdate_Id, messageDelete_Id, messageDeleteBulk_Id, messageUpdate_Id, guildMemberAdd_Id, guildMemberKick_Id, guildMemberRemove_Id, guildMemberUpdate_Id, guildMemberNickUpdate_Id, voiceChannelLeave_Id, voiceChannelJoin_Id, voiceStateUpdate_Id, voiceChannelSwitch_Id, guildEmojisUpdate_Id, Menu_Select_Values) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database('./lib/database/SQLite.db');
            db.run('INSERT INTO Logger_Collection VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ', [null ,Guild_Id, Category_Id, channelCreate_Id, channelUpdate_Id, channelDelete_Id, guildBanAdd_Id, guildBanRemove_Id, guildRoleCreate_Id, guildRoleDelete_Id, guildRoleUpdate_Id, guildUpdate_Id, messageDelete_Id, messageDeleteBulk_Id, messageUpdate_Id, guildMemberAdd_Id, guildMemberKick_Id, guildMemberRemove_Id, guildMemberUpdate_Id, guildMemberNickUpdate_Id, voiceChannelLeave_Id, voiceChannelJoin_Id, voiceStateUpdate_Id, voiceChannelSwitch_Id, guildEmojisUpdate_Id, Menu_Select_Values], function (err) {
                db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }

    delete_Logger_Collection(Guild_Id) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database('./lib/database/SQLite.db');
            db.run('DELETE FROM Logger_Collection WHERE Guild_Id = ?', [Guild_Id], function (err) {
                db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }
}

module.exports = {
    Logger_DatabaseFunction
}