const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const voiceStateUpdate = {
    name : "voiceStateUpdate",
    once : false,
    async execute(oldState, newState, client) {
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(oldState.guild.id);
        if(!guild_ids.includes(oldState.guild.id)) return;
        if(newState.member && !newState.channel) {
            const member = newState.member;
            const embed = new EmbedBuilder()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Left Voice Channel`)
                .setDescription(`**${member.user.tag}** left <:vc:1098318595773186191> ${oldState.channel.name}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({text: `ID: ${member.id}`})
            if(channelId[0].voice_logs_Id == null) return;
            newState.guild.channels.fetch(channelId[0].voice_logs_Id).then(async channel => {
                await channel.send({embeds: [embed]})
            })
        } else if(newState.member && newState.channel && !oldState.channel) {
            const member = newState.member;
            const embed = new EmbedBuilder()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Joined Voice Channel`)
                .setDescription(`**${member.user.tag}** joined <:vc:1098318595773186191> ${newState.channel.name}`)
                .setColor('#00FF00')
                .setTimestamp()
                .setFooter({text: `ID: ${member.id}`})
            if(channelId[0].voice_logs_Id == null) return;
            newState.guild.channels.fetch(channelId[0].voice_logs_Id).then(async channel => {
                await channel.send({embeds: [embed]})
            })
        } else if (oldState.channel && newState.channel) {
            const embed = new EmbedBuilder()
                .setAuthor({name: oldState.member.user.tag, iconURL: oldState.member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Moved Voice Channel`)
                // .setDescription(`<:vc:1098318595773186191> ${oldState.channel.name} 🡺 <:vc:1098318595773186191> ${newState.channel.name}`)
                .setDescription(`**Before** : <:vc:1098318595773186191> ${oldState.channel.name}\n **         **m⮑**After** : <:vc:1098318595773186191> ${newState.channel.name}`)
                .setColor('#1034A6')
                .setTimestamp()
                .setFooter({text: `ID: ${oldState.member.id}`})
            if(channelId[0].voice_logs_Id == null) return;
            newState.guild.channels.fetch(channelId[0].voice_logs_Id).then(async channel => {
                await channel.send({embeds: [embed]})
            })
        }
    }
}

module.exports = {
    voiceStateUpdate
};