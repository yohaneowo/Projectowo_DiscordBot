const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {

        interaction.reply("template command")
        const db = new sqlite3.Database("./lib/database/SQLite.db") 

        function fuxk() {
            return new Promise(function (resolve, reject) {
                    db.all('SELECT  CAST(guild_id AS TEXT) as Guild_Id FROM Guild_Collection', [], function (err, rows) {
                        Guild_Ids = [];
                        if (err) {
                            reject(err)
                        } else {
                            rows.forEach(element => {Guild_Ids.push(parseInt(element.Guild_Id))});
                            // let Guild_Ids = rows.map(row => row.Guild_Id);
                            console.log("🚀 ~ file: test.js:21 ~ Guild_Ids:", Guild_Ids)
                
                            resolve(Guild_Ids)
                        }
                    },
                    )
            })
        }
        a = fuxk()
            .then(function(Guild_Ids){
                console.log(Guild_Ids);
            })
            .catch(function (err) {
                console.error(err);
            });
        console.log(a)
    },
}