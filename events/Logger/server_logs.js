const {EmbedBuilder, Embed} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const {ChannelType} = require('../../commands_modules/misc/ChannelType.js')

const guildChannelCreate = {
    name : "channelCreate",
    once : false,
    async execute(channel, client) {
        const channelType = new ChannelType();
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(channel.guild.id);
        if(!guild_ids.includes(channel.guild.id)) return;
        const embed = new EmbedBuilder()
            .setAuthor({name: channel.guild.name, iconURL: channel.guild.iconURL({dynamic: true}) })
            .setTitle(`Channel Created #${channel.name}`)
            .setDescription(`Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``)
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter({text: `ID: ${channel.id}`})
        channel.guild.channels.fetch(channelId[0].server_logs_Id).then(async channel => {
            // console.log(channel);
        if(channelId[0].server_logs_Id == null) return;
            await channel.send({embeds: [embed]})
        })
    }
}
const guildChannelDelete = {
    name: 'channelDelete',
    once: false,
    async execute(channel, client) {
        const channelType = new ChannelType();
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(channel.guild.id);
        if(!guild_ids.includes(channel.guild.id)) return;
        const embed = new EmbedBuilder()
            .setAuthor({name: channel.guild.name, iconURL: channel.guild.iconURL({dynamic: true}) })
            .setTitle(`Channel Deleted #${channel.name}`)
            .setDescription(`Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({text: `ID: ${channel.id}`})
        
        if(channelId[0].server_logs_Id == null) return;
        channel.guild.channels.fetch(channelId[0].server_logs_Id).then(async channel => {
            // console.log(channel);
        
            await channel.send({embeds: [embed]})
        })
    }
}

const guildChannelUpdate = {
    name: 'channelUpdate',
    once: false,
    async execute(oldChannel, newChannel, client) {
        let embedFieldString_Before = '';
        let embedFieldString_After = '';
        const channelType = new ChannelType();
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(oldChannel.guild.id);
        if(!guild_ids.includes(oldChannel.guild.id)) return;

        if(oldChannel.name !== newChannel.name) {
            embedFieldString_Before += `**Name :** ${oldChannel.name}\n`;
            embedFieldString_After += `**Name :** ${newChannel.name}\n`;
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
        if(oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
            embedFieldString_Before += `**Permissions :**${oldChannel.permissionOverwrites || 'None'}\n`;
            embedFieldString_After += `**Permissions :**${newChannel.permissionOverwrites || 'None'}\n`;
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
         const embed = new EmbedBuilder() 
            .setTitle(`${channelType.getChannelTypeName(newChannel.type)} Updated`)
            .setColor('#546EED')
            .addFields({ name: '**Before**', value: `${embedFieldString_Before}`, inline: true })
            .addFields({ name: '**After**', value: `${embedFieldString_After}`, inline: true })
            .setTimestamp()
            .setFooter({text: `ID: ${oldChannel.id}`})
        if(channelId[0].server_logs_Id == null) return;
        oldChannel.guild.channels.fetch(channelId[0].server_logs_Id).then(async channel => {
            // console.log(channel);
        
            await channel.send({embeds: [embed]})
        })
    }
}
    
module.exports = {
    guildChannelCreate,
    guildChannelDelete,
    guildChannelUpdate
}
