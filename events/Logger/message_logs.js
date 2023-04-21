const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
function sendEmbed(parameter, channel_id, embed) {
    if(channel_id == null) return;
    parameter.guild.channels.fetch(channel_id).then(async channel => {
        await channel.send({embeds: [embed]})
    })
}

// const GuildMessageCreate = {
//     name: 'messageCreate',
//     once: false,
//     async execute(message, client) {
//         const databaseFunctionManager = new Logger_DatabaseFunction();
//         const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
//         const channel_Ids = await databaseFunctionManager.getChannelIds_Logger_Collection(message.guild.id);
//         if(!guild_ids.includes(message.guild.id)) return;
//         const channel_Id = channel_Ids[0].member_logs_Id;
//         const embed = new EmbedBuilder()
//             .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true}) })
//             .setTitle(`Message Sent`)
//             .setDescription(`**${message.author.tag}** sent a message in ${message.channel}`)
//             .addField(`Message Content`, message.content)
//             .setColor('#00FF00')
//             .setTimestamp()
//             .setFooter({text: `ID: ${message.author.id}`})
//         sendEmbed(message, channel_Id, embed);
//     }
// }

const GuildMessageDelete = {
    name: 'messageDelete',
    once: false,
    async execute(message, client) {
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channel_Ids = await databaseFunctionManager.getChannelIds_Logger_Collection(message.guild.id);
        if(!guild_ids.includes(message.guild.id)) return;
        const channel_Id = channel_Ids[0].member_logs_Id;
        const embed = new EmbedBuilder()
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true}) })
            .setTitle(`Message deleted in #${message.channel}`)
            .setDescription(`${message.content}`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({text: `ID: ${message.author.id}`})
        sendEmbed(message, channel_Id, embed);
    }
}

const GuildMessageUpdate = {
    name: 'messageUpdate',
    once: false,
    async execute(oldMessage, newMessage, client) {
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channel_Ids = await databaseFunctionManager.getChannelIds_Logger_Collection(oldMessage.guild.id);
        if(!guild_ids.includes(oldMessage.guild.id)) return;
        const channel_Id = channel_Ids[0].member_logs_Id;
        const embed = new EmbedBuilder()
            .setAuthor({name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL({dynamic: true}) })
            .setTitle(`Message edited in ${oldMessage.channel}`)
            .setDescription(`Before: ${oldMessage.content}\n+After: ${newMessage.content}`)
            .setColor('#FFFF00')
            .setTimestamp()
            .setFooter({text: `ID: ${oldMessage.author.id}`})
            .setURL(oldMessage.url)
        sendEmbed(newMessage, channel_Id, embed);
    }
}
module.exports = {
    // GuildMessageCreate,
    GuildMessageDelete,
    GuildMessageUpdate
};