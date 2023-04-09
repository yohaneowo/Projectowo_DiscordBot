const { SlashCommandBuilder } = require('discord.js');
const insertMemberCount = require('../commands/MemberCount.js')
const deleteMemberCount = require('../commands/DeleteMemberCount.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription("test command")
        .addSubcommand(insertMemberCount.data)
        .addSubcommand(deleteMemberCount.data)

        ,
    async execute(interaction, client) {
        const errorEmbed = new Error_Embed();
        try {

            interaction.reply('done');
        } catch (err) {
            errorEmbed.sendChannelError(interaction, err);
        }
    },  
}
