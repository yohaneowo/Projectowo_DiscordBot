const {SlashCommandBuilder, EmbedBuilder, Collection} = require("discord.js");
const sqlite3 = require("sqlite3");
const {PREFIX} = require("../config.json");

module.exports = {
    data : new SlashCommandBuilder ()
        .setName("ae")
        .setDescription("View Ani_emoji's Names"),

    async execute(message ,client){
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        let emoji_data = (`SELECT Emoji_Name FROM emoji_collection WHERE AnimatedBoolean = 1`)
        /* Database */
        
        db.all(emoji_data, [],   (err, rows) => {
            let emojisName = [];
            if (err) {
                throw err;
            }
            rows.forEach(function (row) {
                    let emoji_name = row.Emoji_Name
                    emojisName.push(emoji_name)
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