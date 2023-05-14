const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const {ChannelType} = require('../../commands_modules/misc/ChannelType.js')
const sendEmbed = require('../../commands_modules/logger/l_eventsFunction.js')
const loggerDbFunctionsManager = new Logger_DatabaseFunction();
const channelType = new ChannelType();

const guildChannelCreate = {
    name : "channelCreate",
    once : false,
    async execute(channel) {
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(channel.guild.id);
        if(!guildsUsingLogger.includes(channel.guild.id)) return;
        const guildChannelCreate_embed = new EmbedBuilder()
            .setAuthor({name: channel.guild.name, iconURL: channel.guild.iconURL({dynamic: true}) })
            .setTitle(`Channel Created #${channel.name}`)
            .setDescription(`Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``)
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter({text: `ID: ${channel.id}`})
            const serverLogsChannelId = loggerCollectionData[0].serverLogsChannelId
            sendEmbed(channel, serverLogsChannelId, guildChannelCreate_embed);
        
    }
}
const guildChannelDelete = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {
        const eventEmitter_Guild_Id = channel.guild.id;
        const channelType = new ChannelType();
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const guildChannelDelete_embed = new EmbedBuilder()
            .setAuthor({name: channel.guild.name, iconURL: channel.guild.iconURL({dynamic: true}) })
            .setTitle(`Channel Deleted #${channel.name}`)
            .setDescription(`Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({text: `ID: ${channel.id}`})
        const serverLogsChannelId = loggerCollectionData[0].serverLogsChannelId
        sendEmbed(channel, serverLogsChannelId, guildChannelDelete_embed);
    }
}

const guildChannelUpdate = {
    name: 'channelUpdate',
    once: false,
    async execute(oldChannel, newChannel) {
        const eventEmitter_Guild_Id = oldChannel.guild.id;
        let embedFieldString_Before = '';
        let embedFieldString_After = '';
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;

        if(oldChannel.name !== newChannel.name) {
            embedFieldString_Before += `**Name :** ${oldChannel.name}\n`;
            embedFieldString_After += `**Name :** ${newChannel.name}\n`;
        } else {
            embedFieldString_Before += `**Name :** ${oldChannel.name}\n`;
            embedFieldString_After += `**Name :** ${newChannel.name}\n`;
            embedFieldString_Before += `**Permissions :**${oldChannel.permissionOverwrites || 'None'}\n`;
            embedFieldString_After += `**Permissions :**${newChannel.permissionOverwrites || 'None'}\n`;
        }
        if(oldChannel.topic !== newChannel.topic) {
            embedFieldString_Before += `**Topic :** ${oldChannel.topic || 'None'}\n`;
            embedFieldString_After += `**Topic :** ${newChannel.topic || 'None'}\n`;
        }
        if(oldChannel.nsfw !== newChannel.nsfw) {
            embedFieldString_Before += `**NSFW :** ${oldChannel.nsfw}\n`;
            embedFieldString_After += `**NSFW :** ${newChannel.nsfw}\n`;
        }
        if(oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
            embedFieldString_Before += `**Slowmode :** ${oldChannel.rateLimitPerUser || 'None'}\n`;
            embedFieldString_After += `**Slowmode :**${newChannel.rateLimitPerUser || 'None'}\n`;
        }
        if(oldChannel.parentId !== newChannel.parentId) {
            embedFieldString_Before += `**Category :**${oldChannel.parent.name || 'None'}\n`;
            embedFieldString_After += `**Category :**${newChannel.parent.name || 'None'}\n`;
        }
        
        if(oldChannel.position !== newChannel.position) {
            embedFieldString_Before += `**Position :**${oldChannel.position}\n`;
            embedFieldString_After += `**Position :**${newChannel.position}\n`;
        }
        if(oldChannel.bitrate !== newChannel.bitrate) {
            embedFieldString_Before += `**Bitrate :**${oldChannel.bitrate}\n`;
            embedFieldString_After += `**Bitrate :**${newChannel.bitrate}\n`;
        }
        if(oldChannel.userLimit !== newChannel.userLimit) {
            embedFieldString_Before += `**User Limit :**${oldChannel.userLimit}\n`;
            embedFieldString_After += `**User Limit :**${newChannel.userLimit}\n`;
        }
        if(oldChannel.rtcRegion !== newChannel.rtcRegion) {
            embedFieldString_Before += `**Region :**${oldChannel.rtcRegion}\n`;
            embedFieldString_After += `**Region :**${newChannel.rtcRegion}\n`;
        }
        if(oldChannel.type !== newChannel.type) {
            embedFieldString_Before += `**Type :**${oldChannel.type}\n`;
            embedFieldString_After += `**Type :**${newChannel.type}\n`;
        }
        if(oldChannel.rawPosition !== newChannel.rawPosition) {
            embedFieldString_Before += `**Raw Position :**${oldChannel.rawPosition}\n`;
            embedFieldString_After += `**Raw Position :**${newChannel.rawPosition}\n`;
        }
        
         const guildChannelUpdate_embed = new EmbedBuilder() 
            .setTitle(`${channelType.getChannelTypeName(newChannel.type)} Updated`)
            .setColor('#546EED')
            .addFields({ name: '**Before**', value: `${embedFieldString_Before}`, inline: true })
            .addFields({ name: '**After**', value: `${embedFieldString_After}`, inline: true })
            .setTimestamp()
            .setFooter({text: `ID: ${oldChannel.id}`})
        const serverLogsChannelId = loggerCollectionData[0].serverLogsChannelId
        sendEmbed(oldChannel, serverLogsChannelId, guildChannelUpdate_embed)
    }
}
    
module.exports = {
    guildChannelCreate,
    guildChannelDelete,
    guildChannelUpdate
}
