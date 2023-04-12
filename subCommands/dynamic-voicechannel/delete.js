const sqlite3 = require('sqlite3')
module.exports = async (interaction, client) => {
    try {
        const Guild_Id = interaction.guild.id;
        const db = new sqlite3.Database('./lib/database/SQLite.db')
        db.serialize(() => {
            db.run(`DELETE FROM DynamicVC_Stats WHERE Guild_Id = ?`, [Guild_Id]),
            function(err) {
                if (err) {
                    return console.log(err.message);
                } 
            }
            db.close()
        });
        interaction.editReply({ content: 'DynamicVC已刪除' })
    } catch (err) {
        console.error(err);
    }
}