const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');

const GuildMemberAdd = {
    name : 'guildMemberAdd',
    once : false,
    async execute(member, client) {
        const totalMembers = member.guild.memberCount; 
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(member.guild.id);
        if(!guild_ids.includes(member.guild.id)) return;
        const embed = new EmbedBuilder()
            .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
            .setTitle(`Member Joined`)
            .setDescription(`${member} ${totalMembers}nd to join Created Time${member.user.createdAt}`)
            .setColor('#93c47d')
            .setTimestamp()
            .setFooter({text: `ID: ${member.id}`})
        member.guild.channels.fetch(channelId[0].joinleave_logs_Id).then(async channel => {
            // console.log(channel);
        if(channelId[0].joinleave_logs_Id == null) return;
            await channel.send({embeds: [embed]})
        })
    }
}

const GuildMemberRemove = {
    name : 'guildMemberRemove',
    once : false,
    async execute(member, client) {
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(member.guild.id);
        if(!guild_ids.includes(member.guild.id)) return;
        const embed = new EmbedBuilder()
            .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL({dynamic: true}) })
            .setTitle(`Member Left`)
            .setDescription(`${member} joined ${member.joinedAt} ago`)
            .setColor('#e06666')
            .setTimestamp()
            .setFooter({text: `ID: ${member.id}`})
        member.guild.channels.fetch(channelId[0].joinleave_logs_Id).then(async channel => {
            // console.log(channel);
        if(channelId[0].joinleave_logs_Id == null) return;
            await channel.send({embeds: [embed]})
        })
    }
}


module.exports = {
    GuildMemberAdd,
    GuildMemberRemove
}
