const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const sendEmbed = require('../../commands_modules/logger/L_eventsFunction.js')
const loggerDbFunctionsManager = new Logger_DatabaseFunction();



const GuildMemberUpdate = {
    name: 'guildMemberUpdate',
    once: false,
    async execute(oldMember, newMember) {
        const eventEmitter_Guild_Id = oldMember.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        const memberLogsChannelId = loggerCollectionData[0].memberLogsChannelId;
        if(oldMember.nickname !== newMember.nickname) {
                const embed = new EmbedBuilder()
                    .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                    .setTitle(`Nickname Update`)
                    .setDescription(`**${oldMember.nickname}** 🡺 **${newMember.nickname}**`)
                    .setColor('#2986cc')
                    .setTimestamp()
                    .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,memberLogsChannelId, embed)
        } else if(oldMember.roles.cache.size !== newMember.roles.cache.size){
            if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
            const oldRoles = new Set(oldMember.roles.cache.values());
            const newRoles = new Set(newMember.roles.cache.values());
            const addedRoles = [...newRoles].filter(role => !oldRoles.has(role));
            const removedRoles = [...oldRoles].filter(role => !newRoles.has(role));
            
            const GuildMemberUpdate_embed = new EmbedBuilder()
                .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Role Update`)
                .setColor('#2986cc')
                .setTimestamp()
                .setFooter({text: `ID: ${newMember.id}`})
            if(addedRoles.length>0) {
                GuildMemberUpdate_embed.setDescription(`**+${addedRoles}**`)
            } else if(removedRoles) {
                GuildMemberUpdate_embed.setDescription(`**-${removedRoles}**`)
            }
            sendEmbed(oldMember ,memberLogsChannelId, GuildMemberUpdate_embed)
        }   
    }
}

const GuildUserUpdate = {
    name: 'userUpdate',
    once: false,
    async execute(oldUser, newUser, client) {
        if (oldUser.avatarURL() !== newUser.avatarURL() && !oldUser.bot) {
            const memberLogs_Ids = await loggerDbFunctionsManager.getMemberLogs_Ids_Logger_Collection();
            client.guilds.cache.forEach(async guild => {
                const channel_Ids = Array.from(guild.channels.cache.values()).map(channel => channel.id);
                let matchingChannel_Id;
                channel_Ids.some(value => {
                    if(memberLogs_Ids.includes(value)) {
                    matchingChannel_Id = value;
                    return true
                    }
                });
                if(matchingChannel_Id) {
                    const embed = new EmbedBuilder()
                        .setAuthor({name: newUser.tag, iconURL: newUser.displayAvatarURL({dynamic: true})})
                        .setTitle(`Avatar Update`)
                        .setDescription(`${newUser.tag}`)
                        .setImage(newUser.displayAvatarURL({dynamic: true}))
                        .setColor('#2986cc')
                        .setTimestamp()
                        .setFooter({text: `ID: ${newUser.id}`})
                    guild.channels.fetch(matchingChannel_Id).then(async channel => {
                        await channel.send({embeds: [embed]})
                    })
                }
            })
        }
        if (oldUser.username !== newUser.username && !oldUser.bot) {
            const memberLogs_Ids = await loggerDbFunctionsManager.getMemberLogs_Ids_Logger_Collection();
            client.guilds.cache.forEach(async guild => {
                const channel_Ids = Array.from(guild.channels.cache.values()).map(channel => channel.id);
                let matchingChannel_Id;
                channel_Ids.some(value => {
                    if(memberLogs_Ids.includes(value)) {
                    matchingChannel_Id = value;
                    return true
                    }
                });
                if(matchingChannel_Id) {
                    const embed = new EmbedBuilder()
                        .setAuthor({name: newUser.tag, iconURL: newUser.displayAvatarURL({dynamic: true})})
                        .setTitle(`Username Update`)
                        .setDescription(`**${oldUser.username}** 🡺 **${newUser.username}**`)
                        .setColor('#2986cc')
                        .setTimestamp()
                        .setFooter({text: `ID: ${newUser.id}`})
                    guild.channels.fetch(matchingChannel_Id).then(async channel => {
                        await channel.send({embeds: [embed]})
                    })
                }
            })
        }
    }
}

const GuildBanAdd = {
    name: 'guildBanAdd',
    once: false,
    async execute(guildBan) {
        const eventEmitter_Guild_Id = guildBan.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const memberLogsChannelId = loggerCollectionData[0].memberLogsChannelId;
        const GuildBanAdd_embed = new EmbedBuilder()
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})})
            .setTitle(`User Banned`)
            .setDescription(`**${user.tag}** has been banned from the server.`)
            .addFields({name: `Reason`, value: `${guildBan.reason}` || `No reason provided`})
            .setColor('#2986cc')
            .setTimestamp()
            .setFooter({text: `ID: ${user.id}`})
        sendEmbed(guildBan, memberLogsChannelId, GuildBanAdd_embed)
    }
}

const GuildBanRemove = {
    name: 'guildBanRemove',
    once: false,
    async execute(guildBan) {
        const eventEmitter_Guild_Id = guildBan.guild.id;
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guildsUsingLogger = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await databaseFunctionManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const memberLogsChannelId = loggerCollectionData[0].memberLogsChannelId;
        const GuildBanRemove_embed = new EmbedBuilder()
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})})
            .setTitle(`User Unbanned`)
            .setDescription(`**${user.tag}** has been unbanned from the server.`)
            .addFields({name: `Reason`, value: `${guildBan.reason}` || `No reason provided`})
            .setColor('#2986cc')
            .setTimestamp()
            .setFooter({text: `ID: ${user.id}`})
        sendEmbed(guildBan, memberLogsChannelId, GuildBanRemove_embed)
    }
}

module.exports = {
    GuildMemberUpdate,
    GuildUserUpdate,
    GuildBanAdd,
    GuildBanRemove

}