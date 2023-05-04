const {EmbedBuilder, formatEmoji} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const sendEmbed = require('../../commands_modules/logger/L_eventsFunction.js')
const loggerDbFunctionsManager = new Logger_DatabaseFunction();


const voiceStateUpdate = {
    name : "voiceStateUpdate",
    once : false,
    async execute(oldState, newState) {
        const eventEmitter_Guild_Id = oldState.guild.id;
        const guild_ids = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guild_ids.includes(eventEmitter_Guild_Id)) return;
        if(newState.member && !newState.channel) {
            const member = newState.member;
            const voiceState_Left_embed = new EmbedBuilder()
                .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
                .setTitle(`Member Left Voice Channel`)
                .setDescription(`**${member.user.tag}** left <:vc:1098318595773186191> ${oldState.channel.name}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({text: `ID: ${member.id}`})
            const voiceLogsChannelId = loggerCollectionData[0].voiceLogsChannelId;
            sendEmbed(oldState, voiceLogsChannelId, voiceState_Left_embed)
            
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

        } else if (oldState.channel != newState.channel) {
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