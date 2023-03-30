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
                    db.all('SELECT Guild_Id FROM Guild_Collection', [], function (err, rows) {
                        if (err) {
                            reject(err)
                        } else {
                            const guildIds = rows.map(row => row.Guild_Id);
                            resolve(guildIds)
                        }
                    },
                    )
            })
        }
        a = fuxk()
            .then(function(guildIds){
                console.log(guildIds);
            })
            .catch(function (err) {
                console.error(err);
            });
        console.log(a)
    },
}