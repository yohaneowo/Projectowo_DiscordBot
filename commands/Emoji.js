const {SlashCommandBuilder, EmbedBuilder, Collection} = require("discord.js");
const sqlite3 = require("sqlite3");
const {PREFIX} = require("../config.json");

module.exports = {
    data : new SlashCommandBuilder ()
        .setName("ae")
        .setDescription("View Animoji's Names"),

    async execute(message ,client){
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        let emojidata = (`SELECT Emoji_Name FROM emoji_collection WHERE AnimatedBoolean = 1`)
        /* Database */
        
        db.all(emojidata, [],   (err, rows) => {
            let emojisName = [];
            if (err) {
                throw err;
            }
            rows.forEach(function (row) {
                    let emojiname = row.Emoji_Name
                    emojisName.push(emojiname)
                },
            )
            // console.log(emojisName)
            try {
                message.channel.send(emojisName.toString())
            } catch (err) {
                console.log(err)
            }
            
        })


    },
}