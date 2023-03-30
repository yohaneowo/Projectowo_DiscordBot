const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        interaction.reply("template command")
        const db = new sqlite3.Database("./lib/database/SQLite.db") 
        db.transaction(function () {
            db.executeSql('SELECT Guild_Id FROM Guild_Collection', [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    console.log(results.rows.item(i).Guild_Id);
                }
            }
        )},)
        // Guild_Ids = db.run("SELECT Guild_Id FROM Guild_Collection")
        console.log( Guild_Ids);
        console.log(`FUCK YOU${Guild_Ids}`);
    },
};