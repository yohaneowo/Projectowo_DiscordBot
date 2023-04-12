const client = require('../index.js');  
const sqlite3 = require('sqlite3');
const {PermissionsBitField, ChannelType} = require('discord.js');
const {DynamicVC_DatabaseManager} = require('../commands_modules/dynamic_voicechannel/dv_databaseFunctionManager.js');
module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldState, newState) {
        if(newState.channel) {
            try {
                const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();
                const Guild_Ids = await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_Stats();
                console.log(Guild_Ids)
                const Guild_Id = newState.guild.id;
                if(Guild_Ids.includes(Guild_Id)){
                    const db = new sqlite3.Database('./lib/database/SQLite.db')
                        const dynamicVC_Stats = await dynamicVC_DatabaseManager.getDynamicVC_Stats(Guild_Id);
                        const mainChannel = await client.channels.cache.get(dynamicVC_Stats[0].Set_mainChannel_Id)
                        if(dynamicVC_Stats[0].Set_mainChannel_Id == newState.channelId) {
                            const subChannel = await newState.guild.channels.create(
                                {
                                    name: 'NEW TEDT',
                                    type: ChannelType.GuildVoice,
                                    permissionOverwrites: [
                                        {
                                            id: newState.guild.roles.everyone,
                                            deny: [PermissionsBitField.Flags.ManageChannels],
                                        }
                                    ],
                                    parent: mainChannel.parentId
                                }
                            )
                            await dynamicVC_DatabaseManager.insertDynamicVC_subId(Guild_Id, subChannel.id)
                        }

                }
            } catch (err) {
                console.error(err);
            }
        }

        else if(oldState.channel) {
            try {
                const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();
                const Guild_Ids = await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId();
                const Guild_Id = oldState.guild.id;
                if(Guild_Ids.includes(Guild_Id)){
                    const dynamicVC_subIds = await dynamicVC_DatabaseManager.getDynamicVC_subId(Guild_Id);
                    console.log(dynamicVC_subIds)
                    console.log(oldState.channelId)
                    if(dynamicVC_subIds.includes(oldState.channelId)) {
                        const subChannel = await client.guilds.fetch(oldState.guild.id).then(guild => guild.channels.fetch(oldState.channelId))

                        await subChannel.delete()
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
}