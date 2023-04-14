const {  ChannelType, PermissionsBitField} = require('discord.js');
const sqlite3 = require('sqlite3')
const {Welcomer_DatabaseManager} = require(process.cwd() +'/commands_modules/welcomer/wc_databaseFunctionManager.js')
module.exports = async (interaction, client) =>  {
    try {
        const welcomer_DatabaseManager = new Welcomer_DatabaseManager()
            const createdAt = new Date()
            const setChannel = await interaction.guild.channels.create(
                {
                    name: '₩ɇⱡ₵ø₥ɇ-☢',
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        }
                    ]
                }
            )
            welcomer_DatabaseManager.insertWelcomer_Collection(setChannel.id, interaction.guild.id ,createdAt, interaction.user.id)
            interaction.editReply({ content: 'Welcomer已建立' })
    } catch (err) {
        console.error(err);
    }
}