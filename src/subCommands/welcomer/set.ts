


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ChannelTyp... Remove this comment to see the full error message
const {  ChannelType, PermissionsBitField} = require('discord.js');



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require('sqlite3')



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Welcomer_D... Remove this comment to see the full error message
const {Welcomer_DatabaseManager} = require('../../commands_modules/welcomer/wc_databaseFunctionManager.js')



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createChan... Remove this comment to see the full error message
const {createChannel} = require('../../commands_modules/misc/CreateChannel.js')


module.exports = async (interaction, client) =>  {
    try {
        const permissionOverwrites =  [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        }
                    ]
        const welcomer_DatabaseManager = new Welcomer_DatabaseManager()
            const createdAt = new Date()
            const setChannel = await createChannel(interaction, '₩ɇⱡ₵ø₥ɇ-☢', 'textChannel', permissionOverwrites, null)
            welcomer_DatabaseManager.insertWelcomer_Collection(setChannel.id, interaction.guild.id ,createdAt, interaction.user.id)
            interaction.editReply({ content: 'Welcomer已建立' })
    } catch (err) {
        console.error(err);
    }
}