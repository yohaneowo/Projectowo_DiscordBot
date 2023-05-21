const {getDb, closeDb} = require('../../sqlConnection.js')
const sqlite3 = require("sqlite3");

class Animoji_DatabaseFunction {
    // constructor() {
    //     this.db = getDb();
    // }
    getPrefix(user_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT prefix FROM user_emoji_prefix WHERE user_id = ?`)
                const row = stmt.get(user_id)
                if(row) {
                    resolve(row.prefix)
                } else {
                    resolve(null)
                }

            } catch (err) {
                reject(err)

            } 
        })
    }
    updatePrefix(user_id, prefix) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`UPDATE user_emoji_prefix SET prefix = ? WHERE user_id = ?`)
                stmt.run(prefix, user_id)
                resolve()
            } catch (err) {
                reject(err)
            } 
        })
    }

    insertPrefix(user_id, prefix) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`INSERT INTO user_emoji_prefix VALUES (?, ?)`)
                stmt.run(user_id, prefix)
                resolve()
            } catch (err) {
                reject(err)
            } 
        })
    }
    getGuild(guild_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT * FROM user_emoji_storage WHERE guild_id = ?`)
                const row = stmt.get(guild_id)
                if(row) {
                    resolve(row.guild_id)
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    insertGuild(user_id, guild_id){
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`INSERT INTO user_emoji_storage VALUES (?, ?)`)
                stmt.run(guild_id, user_id)
                resolve()
            } catch (err) {
                reject(err)
            } 
        })
    }

    deleteGuild(guild_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                    console.log(guild_id)
                    const stmt =db.prepare(`DELETE FROM user_emoji_storage WHERE guild_id = ?`)
                    stmt.run(guild_id)
                resolve()
            } catch (err) {
                console.log(err)
                reject(err)
            } 
        })
    }

    checkEmojiGuildExist(guild_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT count(*) FROM emoji_collection WHERE belong_to = ?`)
                const row = stmt.get(guild_id)
                if(row > 0 ) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    update_Emoji(old_emoji_identifier, emoji_identifier, emoji_name, emoji_id, emoji_url) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`UPDATE emoji_collection SET emoji_identifier = ?, emoji_id = ?, emoji_name = ?, emoji_url = ? WHERE emoji_identifier = ?`)
                stmt.run(emoji_identifier, emoji_name, emoji_id, emoji_url, animated, old_emoji_identifier)
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    delete_Emoji(emoji_identifier) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`DELETE FROM emoji_collection WHERE emoji_identifier = ?`)
                stmt.run(emoji_identifier)
                resolve()
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
    delete_AllEmoji(guild_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`DELETE FROM emoji_collection WHERE belong_to = ?`)
                stmt.run(guild_id)
                resolve()
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }

    getAllEmojiName(user_id) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT emoji_name FROM emoji_collection WHERE belong_to = ?`)
                const rows = stmt.all(user_id)
                const emoji_name = rows.map(row => row.emoji_name)
                resolve(emoji_name)
            } catch (err) {
                reject(err)
            }
        })
    }

    getEmojiIdentifier(emoji_name) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT emoji_identifier FROM emoji_collection WHERE emoji_name = ?`)
                const row = stmt.get(emoji_name)
                if(row) {
                    resolve(row.emoji_identifier) 
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        })
    }
     insert_Emoji(emoji_id, emoji_name, emoji_identifier, guild_id, createdAt, animated, belong_to , emoji_url, isEmojiPack) {
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`INSERT INTO emoji_collection VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                stmt.run(emoji_id, emoji_name, emoji_identifier, guild_id, createdAt, animated, belong_to, emoji_url, isEmojiPack)
            } catch (err) { 
                reject(';HELO')
            }
        })
    }

    getPrefix(){
        return new Promise((resolve, reject) => {
            try {
                const db = getDb();
                const stmt = db.prepare(`SELECT DISTINCT prefix FROM user_emoji_prefix`)
                const rows = stmt.all()
                const prefix = rows.map(row => row.prefix)
                resolve(prefix)
            } catch (err) {
                reject(err)
            } 
        })
    }

}
module.exports = {
    Animoji_DatabaseFunction
}