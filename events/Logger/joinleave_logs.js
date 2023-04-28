const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const loggerDbFunctionsManager = new Logger_DatabaseFunction();

function sendEmbed(event_parameter, channel_id, embed) {
    if(channel_id == null) return;
    event_parameter.guild.channels.fetch(channel_id).then(async channel => {
        await channel.send({embeds: [embed]})
    })
}

const GuildMemberAdd = {
    name : 'guildMemberAdd',
    once : false,
    async execute(member) {
        const eventEmitter_Guild_Id = member.guild.id;
        const totalMembers = member.guild.memberCount; 
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const GuildMemberAdd_embed = new EmbedBuilder()
            .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
            .setTitle(`Member Joined`)
            .setDescription(`${member} ${totalMembers}nd to join Created Time${member.user.createdAt}`)
            .setColor('#93c47d')
            .setTimestamp()
            .setFooter({text: `ID: ${member.id}`})
        const joinleaveLogsChannelId = loggerCollectionData[0].joinleave_logs_Id;
        sendEmbed(member, joinleaveLogsChannelId, GuildMemberAdd_embed);
    }
}

const GuildMemberRemove = {
    name : 'guildMemberRemove',
    once : false,
    async execute(member) {
        const eventEmitter_Guild_Id = member.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const GuildMemberRemove_embed = new EmbedBuilder()
            .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
            .setTitle(`Member Left`)
            .setDescription(`${member} joined ${member.joinedAt} ago`)
            .setColor('#e06666')
            .setTimestamp()
            .setFooter({text: `ID: ${member.id}`})
        const joinleaveLogsChannelId = loggerCollectionData[0].joinleave_logs_Id;
        sendEmbed(member, joinleaveLogsChannelId, GuildMemberRemove_embed);

    }
}


module.exports = {
    GuildMemberAdd,
    GuildMemberRemove
}
