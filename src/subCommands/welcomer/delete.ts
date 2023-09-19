


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require('sqlite3')



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Welcomer_D... Remove this comment to see the full error message
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