const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {

        interaction.reply("template command")
        const db = new sqlite3.Database("./lib/database/SQLite.db") 
        fuck();

        function fuxk () {
            return new Promise(function(resolve, reject)){
                db.serialize(function () {
                    let guild_Ids = [];
                    db.all('SELECT Guild_Id FROM Guild_Collection', [], function (err, rows) {\
                        if(err){
                            reject(err)
                        } else {
                            rows.forEach(function (row) {
                                guild_Ids.push(row.Guild_Id)
                                console.log(guild_Ids)
                                console.log("hekki")
                                console.log("hekkssi")

                        }
                    },
                    )
                },)
            }
        }
        
        console.log(ab);
        // Guild_Ids = db.run("SELECT Guild_Id FROM Guild_Collection")
        // console.log(Guild_Ids);
        // console.log(`FUCK YOU${Guild_Ids}`);
    },
};