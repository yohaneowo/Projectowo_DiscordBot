const sqlite3 = require("sqlite3");
class member_count_database_commands {
    get_Guild_Ids() {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Member_Count', [], function (err, rows) {
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

    update_Member_Count_Database(guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count) {
        // 用Promise来获取Guild_Ids的遞歸
        get_Guild_Ids().then(function ( Guild_Ids) {
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
                    db.run("INSERT INTO Member_Count VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count]),
                    function(err) {
                        if (err) {
                            return console.log(`INSERTION:${err.message}`);
                        }
                    }
                    db.close();
                    console.log("INSERTED MEMBER COUNT")
                    // interaction.reply({ content: '新增成员计数！', ephemeral: true });
                    })
                }
        })
        .catch(function (err) { console.error(err); });
    }
    
    // insert Server_Status_Collection
   insert_Server_Status_Collection(Guild_Id, Category_Id, All_Members_Count_Id, Users_Count_Id, Bots_Count_Id, All_Online_Count_Id, All_Online_Count_include_idle_Id, All_Online_Count_include_idle_dnd_Id, All_Offline_Count_Id, User_Online_Count_Id, User_Online_Count_include_idle_Id, User_Online_Count_include_idle_dnd_Id, User_Idle_Count_Id, User_Dnd_Count_Id, User_Offline_Count_Id, Added_User_Id, Added_datetime, Menu_Select_Values) {
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        db.serialize(function () {
            db.run("INSERT INTO Server_Status_Collection VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[Guild_Id, Category_Id, All_Members_Count_Id, Users_Count_Id, Bots_Count_Id, All_Online_Count_Id, All_Online_Count_include_idle_Id, All_Online_Count_include_idle_dnd_Id, All_Offline_Count_Id, User_Online_Count_Id, User_Online_Count_include_idle_Id, User_Online_Count_include_idle_dnd_Id, User_Idle_Count_Id, User_Dnd_Count_Id, User_Offline_Count_Id, Added_User_Id, Added_datetime, Menu_Select_Values]),
            function(err) {
                if (err) {
                    return console.log(`INSERTION:${err.message}`);
                }
            }
            db.close();
            console.log("INSERTED SERVER STATUS COLLECTION")
        })
    }
}
module.exports = { 
    member_count_database_commands
}