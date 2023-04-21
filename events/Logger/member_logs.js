const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');

function sendEmbed(oldMember, channel_Id, embed) {
    if(channel_Id == null) return;
        oldMember.guild.channels.fetch(channel_Id).then(async channel => {
            await channel.send({embeds: [embed]})
        })
}

const GuildMemberUpdate = {
    name: 'guildMemberUpdate',
    once: false,
    async execute(oldMember, newMember, client) {
        console.log(oldMember.user.avatarURL())
        console.log(newMember.user.avatarURL())
        if(!guild_ids.includes(oldMember.guild.id)) return;
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channel_Ids = await databaseFunctionManager.getChannelIds_Logger_Collection(oldMember.guild.id);
        const channel_Id = channel_Ids[0].member_logs_Id;
        if(oldMember.nickname !== newMember.nickname) {
                const embed = new EmbedBuilder()
                    .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                    .setTitle(`Nickname Update`)
                    .setDescription(`**${oldMember.nickname}** 🡺 **${newMember.nickname}**`)
                    .setColor('#2986cc')
                    .setTimestamp()
                    .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,channel_Id, embed)
        }
        if(oldMember.roles !== newMember.roles) {
            if(!guild_ids.includes(oldMember.guild.id)) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Role Update`)
                .setDescription(`**Before**: ${oldMember.roles.cache.map(role => role.toString()).join(' ')}\n**After**: ${newMember.roles.cache.map(role => role.toString()).join(' ')}`)
                .setColor('#2986cc')
                .setTimestamp()
                .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,channel_Id, embed)
        }
    }
}

const GuildUserUpdate = {
    name: 'userUpdate',
    once: false,
    async execute(oldUser, newUser, client) {
        if (oldUser.avatarURL() !== newUser.avatarURL()) {
            const databaseFunctionManager = new Logger_DatabaseFunction();
            const memberLogs_Ids = await databaseFunctionManager.getMemberLogs_Ids_Logger_Collection();
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
        if (oldUser.username !== newUser.username) {
            const databaseFunctionManager = new Logger_DatabaseFunction();
            const memberLogs_Ids = await databaseFunctionManager.getMemberLogs_Ids_Logger_Collection();
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
module.exports = {
    GuildMemberUpdate,
    GuildUserUpdate
}