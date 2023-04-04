const sqlite3 = require('sqlite3');

module.exports = {
    get_Guild_Ids : function get_Guild_Ids() {
        return new Promise(function (resolve, reject) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Guild_Collection', [], function (err, rows) {
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
    },
    update_Guild_Collection_Database : function UpdateValue() {
            // 獲取Guild_Ids並傳入
            get_Guild_Ids().then(function(Guild_Ids){
                const db = new sqlite3.Database("./lib/database/SQLite.db") 
                        // 判斷Guild_Ids是否包含Guild_Id
                        if (Guild_Ids.includes(Guild_Id.toString())) {
                            // 原子操作防止Database被多個指令同時操作
                            db.serialize(function() {
                                // 更新Guild_Collection表
                                db.run("UPDATE Guild_Collection SET Guild_Name = ?, Owner_Id = ?, All_Members_Count = ?, Users_Count = ?, Bots_Count = ?, maximumBitrate = ?, preferredLocale = ?, createdAt = ?, premiumTier = ?, premiumSubscriptionCount = ?, nsfwLevel = ?, partnered = ? WHERE Guild_Id = ?", [Guild_Name, Owner_Id, All_Members_Count, Users_Count, Bots_Count, maximumBitrate, preferredLocale, createdAt, premiumTier, premiumSubscriptionCount, nsfwLevel, partnered, Guild_Id]),
                                    function(err) {
                                        if (err) {
                                            return console.log(err.message);
                                        } 
                                    }  
                            });
                            console.log(`Updated Guild Collection Table ${Guild_Name}`)
                        } else {
                            // 原子操作防止Database被多個指令同時操作
                            db.serialize(function() {
                                // 插入Guild_Collection表
                                db.run("INSERT INTO Guild_Collection VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [Guild_Id, Guild_Name, Owner_Id, All_Members_Count, Users_Count, Bots_Count, maximumBitrate, preferredLocale, createdAt, premiumTier, premiumSubscriptionCount, nsfwLevel, partnered]),
                                function(err) {
                                    if (err) {
                                        return console.log(err.message);
                                    } 
                                }
                            });
                            console.log(`Inserted Guild Collection Table ${Guild_Name}`)
                        }
                  
            }).catch(function (err) {
                console.error(err);
            });
        }
}