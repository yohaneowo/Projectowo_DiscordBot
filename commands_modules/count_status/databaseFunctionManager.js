const sqlite3 = require("sqlite3");
class MemberCount_DatabaseFunctions {
    // Get Guild_Ids from Database MemberCount_ChannelId
    get_Guild_Ids_MemberCount_ChannelId() {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM MemberCount_ChannelId', [], function (err, rows) {
                db.close();
                if (err) {
                    reject(err)
                } else {
                    const guild_Ids = rows.map(row => row.Guild_Id);
                    resolve(guild_Ids)
                    }
                }, 
            ) 
        })
    }

    // Get Guild_Ids from Database Member_Count
    get_Guild_Ids_MemberCount_Collection() {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Member_Count_Collection', [], function (err, rows) {
                db.close();
                if (err) {
                    reject(err)
                } else {
                    const guild_Ids = rows.map(row => row.Guild_Id);
                    resolve(guild_Ids)
                    }
                }, 
            ) 
        })
    }

    // Gets that Guild's MemberCount_ChannelId
    get_MemberCount_ChannelId(Guild_Id, selectValues) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all(`SELECT * FROM MemberCount_ChannelId WHERE Guild_Id = ?`, [Guild_Id], function (err, rows) {
                db.close();
                if (err) {
                    reject(err)
                } else {
                    const ChannelId = rows;
                    resolve(ChannelId)
                    }
                }, 
            ) 
        })
    }

    get_MemberCount_SelectValue(Guild_Id) {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all('SELECT Menu_Select_Values FROM MemberCount_ChannelId WHERE Guild_Id = ?', [Guild_Id], function (err, rows) {
                db.close();
                if (err) {
                    reject(err)
                } else {
                    const Menu_Select_Values = rows.map(row => row.Menu_Select_Values);
                    resolve(Menu_Select_Values)
                    }
                }, 
            ) 
        })
    }

    // Update Member_Count_Collection
    update_Member_Count_Database(guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count) {
        // 用Promise来获取Guild_Ids的遞歸
        this.get_Guild_Ids_MemberCount_Collection().then(function (Guild_Ids) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            // 遞歸的Guild_Ids是string所以要轉換來對比
            if (Guild_Ids.includes(guildId.toString())) {
                db.serialize(function () {
                db.run("UPDATE Member_Count SET All_Members_Count = ?, All_Online_Count_include_idle = ?, All_Online_Count_include_idle_dnd = ?, Users_Count = ?, Bots_Count = ?,"+
                    "All_Online_Count = ?, All_Offline_Count = ?, User_Online_Count = ?, User_Online_Count_include_idle = ?, User_Online_Count_include_idle_dnd = ?, User_Idle_Count = ?,"+
                    " User_Dnd_Count = ?, User_Offline_Count = ? WHERE Guild_Id = ?",
                    [All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd,
                            All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count, guildId],
                    function(err) {
                        if (err) {
                            return console.log(`MODIFICATION:${err.message}`);
                        }
                    }
                    )
                console.log("UPDATED MEMBER COUNT")
                db.close();
                // interaction.reply({ content: '已更新成员计数！', ephemeral: true });
                })
            } else {
                db.serialize(function () {
                    db.run("INSERT INTO Member_Count_Collection VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count]),
                    function(err) {
                        if (err) {
                            return console.log(`INSERTION:${err.message}`);
                        }
                    }
                    db.close();
                    console.log("INSERTED Member_Count_Collection")
                    // interaction.reply({ content: '新增成员计数！', ephemeral: true });
                    })
                }
        })
        .catch(function (err) { console.error(err); });
    }
    
    // Insert Server_Status_Collection
   insert_MemberCount_ChannelId(Guild_Id, Category_Id, All_Members_Count_Id, Users_Count_Id, Bots_Count_Id, All_Online_Count_Id, All_Online_Count_include_idle_Id, All_Online_Count_include_idle_dnd_Id, All_Offline_Count_Id, User_Online_Count_Id, User_Online_Count_include_idle_Id, User_Online_Count_include_idle_dnd_Id, User_Idle_Count_Id, User_Dnd_Count_Id, User_Offline_Count_Id, Added_User_Id, Added_dateTime, Menu_Select_Values) {
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        db.serialize(function () {
            db.run("INSERT INTO MemberCount_ChannelId VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[Guild_Id, Category_Id, All_Members_Count_Id, Users_Count_Id, Bots_Count_Id, All_Online_Count_Id, All_Online_Count_include_idle_Id, All_Online_Count_include_idle_dnd_Id, All_Offline_Count_Id, User_Online_Count_Id, User_Online_Count_include_idle_Id, User_Online_Count_include_idle_dnd_Id, User_Idle_Count_Id, User_Dnd_Count_Id, User_Offline_Count_Id, Added_User_Id, Added_dateTime, Menu_Select_Values]),
            function(err) {
                if (err) {
                    return console.log(`INSERTION:${err.message}`);
                }
            }
            db.close();
            console.log("INSERTED MemberCount_ChannelId")
        })
    }

    

    // Gets that Guild's MemberCount_ChannelId
    delete_MemberCount_ChannelId(Guild_Id) {
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        db.serialize(function () {
            db.run("DELETE FROM MemberCount_ChannelId WHERE Guild_Id = ?", [Guild_Id], function(err) {
                if (err) {
                    return console.log(`DELETION:${err.message}`);
                }
            })
            db.close();
            console.log("DELETED MemberCount_ChannelId")
        })
    }

    // Gets that Guild's Member_Count_Collection
    delete_MemberCount_Collection(Guild_Id) {
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        db.serialize(function () {
            db.run("DELETE FROM Member_Count_Collection WHERE Guild_Id = ?", [Guild_Id], function(err) {
                if (err) {
                    return console.log(`DELETION:${err.message}`);
                }
            })
            db.close();
            console.log("DELETED Member_Count_Collection")
        })
    }
}   
module.exports = { 
    MemberCount_DatabaseFunctions
}