const client = require('../index.js');  
const sqlite3 = require('sqlite3');
const {PermissionsBitField, ChannelType} = require('discord.js');
const {DynamicVC_DatabaseManager} = require('../commands_modules/dynamic-voicechannel/dv_databaseFunctionManager.js');
async function createSubChannel(parameter, channel_name, parentId, ChannelType, PermissionsBitField) {
    const subChannel = parameter.guild.channels.create(
            {
                name: channel_name,
                bitrate : 96000,
                type: ChannelType.GuildVoice,
                permissionOverwrites: [
                    {
                        id: parameter.guild.roles.everyone,
                        allow: [PermissionsBitField.Flags.ManageChannels],
                    }
                ],
                parent: parentId
            }
        )
        return subChannel;
    }
        
module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldState, newState) {
        if(newState.channel) {
            try {
                const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();
                const Guild_Ids = await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_Stats();
                const Guild_Id = newState.guild.id;
                if(Guild_Ids.includes(Guild_Id)){
                        const dynamicVC_Stats = await dynamicVC_DatabaseManager.getDynamicVC_Stats(Guild_Id);
                        const mainChannel = await client.channels.cache.get(dynamicVC_Stats[0].Set_mainChannel_Id)
                        const mainChannel_Id = dynamicVC_Stats[0].Set_mainChannel_Id
                        if(newState.channelId == mainChannel_Id) {
                            const subChannel = await createSubChannel(newState, '可改頻道名喲OWO', mainChannel.parentId, ChannelType, PermissionsBitField)
                            await dynamicVC_DatabaseManager.insertDynamicVC_subId(Guild_Id, subChannel.id)
                            let isMoved = false
                            try {
                                await newState.setChannel(subChannel).then(() => isMoved = true)
                            } catch (err) { 
                                await dynamicVC_DatabaseManager.deleteDynamicVC_subId(subChannel.id)
                                isMoved === true  ? null : subChannel.delete()
                            }
                            dynamicVC_DatabaseManager.updateDynamicVC_createCount(Guild_Id);
                        }
                }
            } catch (err) {
                console.error(err);
            }
        }

        if(oldState.channel) {
            try {
                const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();
                const Guild_Ids = await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId();
                const Guild_Id = oldState.guild.id;
                if(Guild_Ids.includes(Guild_Id)){
                    const dynamicVC_subIds = await dynamicVC_DatabaseManager.getDynamicVC_subId(Guild_Id);
                    if(dynamicVC_subIds.includes(oldState.channelId)) {
                        
                        const subChannel = await client.guilds.fetch(oldState.guild.id).then(guild => guild.channels.fetch(oldState.channelId))
                        oldState.channel.members.size == 0 ? await dynamicVC_DatabaseManager.deleteDynamicVC_subId(subChannel.id).then(() => subChannel.delete()) : null;
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }

        // 
    }
}