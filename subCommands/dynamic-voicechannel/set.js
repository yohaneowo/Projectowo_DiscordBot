const {  ChannelType, PermissionsBitField} = require('discord.js');
const sqlite3 = require('sqlite3')
module.exports = async (interaction, client) =>  {
    try {
        const db = new sqlite3.Database('./lib/database/SQLite.db')
            const createdAt = new Date()
            const mainChannel = await interaction.guild.channels.create(
                {
                    name: '陰謀論生成區',
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            allow: [PermissionsBitField.Flags.ManageChannels],
                        }
                    ]
                }
            )
            db.serialize(() => {
                db.run(`INSERT INTO DynamicVC_Stats Values (?, ?, ?, ?, ?)`, [null, mainChannel.id, interaction.guild.id, createdAt, null]),
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    } 
                }
                db.close()
            });
            interaction.editReply({ content: 'DynamicVC已建立' })
    } catch (err) {
        console.error(err);
    }
}