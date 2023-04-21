const sqlite3 = require('sqlite3')
const {Welcomer_DatabaseManager } = require(process.cwd() +'/commands_modules/welcomer/wc_databaseFunctionManager.js')
module.exports = async (interaction, client) => {
    try {
        const welcomer_DatabaseManager = new Welcomer_DatabaseManager()
        const Guild_Id = interaction.guild.id;
        welcomer_DatabaseManager.deleteWelcomer_Collection(Guild_Id)
        interaction.editReply({ content: 'Welcomer已刪除' })
    } catch (err) {
        console.error(err);
    }
}