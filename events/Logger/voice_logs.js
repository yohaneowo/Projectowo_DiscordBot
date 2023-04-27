const {EmbedBuilder, formatEmoji} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');

function sendEmbed(event_parameter, channel_id, embed) {
    if(channel_id == null) return;
    event_parameter.guild.channels.fetch(channel_id).then(async channel => {
        await channel.send({embeds: [embed]})
    })
}
const voiceStateUpdate = {
    name : "voiceStateUpdate",
    once : false,
    async execute(oldState, newState) {
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await databaseFunctionManager.getChannelIds_Logger_Collection(oldState.guild.id);
        if(!guild_ids.includes(oldState.guild.id)) return;
        if(newState.member && !newState.channel) {
            const member = newState.member;
            const voiceState_LEFT_embed = new EmbedBuilder()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Left Voice Channel`)
                .setDescription(`**${member.user.tag}** left <:vc:1098318595773186191> ${oldState.channel.name}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({text: `ID: ${member.id}`})
            const voiceLogsChannelId = loggerCollectionData[0].voiceLogsChannelId;
            sendEmbed(oldState, voiceLogsChannelId, voiceState_LEFT_embed)
        } else if(newState.member && newState.channel && !oldState.channel) {
            const member = newState.member;
            const voiceState_Joined_embed = new EmbedBuilder()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Joined Voice Channel`)
                .setDescription(`**${member.user.tag}** joined <:vc:1098318595773186191> ${newState.channel.name}`)
                .setColor('#00FF00')
                .setTimestamp()
                .setFooter({text: `ID: ${member.id}`})
            const voiceLogsChannelId = loggerCollectionData[0].voiceLogsChannelId;
            sendEmbed(oldState, voiceLogsChannelId, voiceState_Joined_embed)
        } else if (oldState.channel && newState.channel) {
            const voiceState_Moved_embed = new EmbedBuilder()
                .setAuthor({name: oldState.member.user.tag, iconURL: oldState.member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Moved Voice Channel`)
                .setDescription(`**Before** : ${formatEmoji('1098318595773186191')} ${oldState.channel.name}\n **         **⮑**After** : ${formatEmoji('1098318595773186191')} ${newState.channel.name}`)
                .setColor('#1034A6')
                .setTimestamp()
                .setFooter({text: `ID: ${oldState.member.id}`})
            const voiceLogsChannelId = loggerCollectionData[0].voiceLogsChannelId;
            sendEmbed(oldState, voiceLogsChannelId, voiceState_Moved_embed)
        }
    }
}

module.exports = {
    voiceStateUpdate
};