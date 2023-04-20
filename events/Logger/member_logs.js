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
        console.log(oldMember.user.avatarURL())
        console.log(newMember.user.avatarURL())
        if(oldMember.avatarURL() !== newMember.avatarURL()) {
            if(!guild_ids.includes(oldMember.guild.id)) return;
                const embed = new EmbedBuilder()
                    .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                    .setTitle(`Avatar Update`)
                    .setDescription(`${newMember.user.tag}`)
                    .setColor('#2986cc')
                    .setImage(newMember.user.displayAvatarURL({dynamic: true}))
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
         if(oldMember.user.username !== newMember.user.username) {
            if(!guild_ids.includes(oldMember.guild.id)) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Username Update`)
                .setDescription(`**Before**: ${oldMember.user.username}\n**After**: ${newMember.user.username}`)
                .setColor('#2986cc')
                .setTimestamp()
                .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,channel_Id, embed)
         }
         if(oldMember.user.discriminator !== newMember.user.discriminator) {
            if(!guild_ids.includes(oldMember.guild.id)) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Discriminator Update`)
                .setDescription(`**Before**: ${oldMember.user.discriminator}\n**After**: ${newMember.user.discriminator}`)
                .setColor('#2986cc')
                .setTimestamp()
                .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,channel_Id, embed)
         }
         if(oldMember.user.avatar !== newMember.user.avatar) {
            if(!guild_ids.includes(oldMember.guild.id)) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Avatar Update`)
                .setDescription(`**Before**: ${oldMember.user.avatar}\n**After**: ${newMember.user.avatar}`)
                .setColor('#2986cc')
                .setTimestamp()
                .setFooter({text: `ID: ${newMember.id}`})
            sendEmbed(oldMember ,channel_Id, embed)
         }
    }
}

module.exports = {
    GuildMemberUpdate
}