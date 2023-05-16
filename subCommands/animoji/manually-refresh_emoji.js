const { Animoji_DatabaseFunction } = require('../../commands_modules/animoji/a_databaseFunctionManager.js');
const { AnimojiFunctionManager } = require('../../commands_modules/animoji/a_FunctionManager.js');

module.exports = 
    async (interaction, client) => {
        const animojiFunctionManager = new AnimojiFunctionManager();
        const animojiDbManager =  new Animoji_DatabaseFunction();
        const owner_id = interaction.guild.ownerId
        const user_id = interaction.user.id;
        if(owner_id == user_id) {
            await animojiDbManager.deleteEmoji(guild_id)
            try {
                await animojiFunctionManager.insertEmoji(interaction, guild_id, user_id) 
                interaction.editReply({content: `done set guild`, ephemeral: true})
            } catch (err) {
                interaction.followUp({content: `发现有同名的哦`, ephemeral: true})
            }
        }
}