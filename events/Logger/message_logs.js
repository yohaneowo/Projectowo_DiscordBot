const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const sendEmbed = require('../../commands_modules/logger/l_eventsFunction.js')
const loggerDbFunctionsManager = new Logger_DatabaseFunction();

const GuildMessageDelete = {
    name: 'messageDelete',
    once: false,
    async execute(message) {
        const eventEmitter_Guild_Id = message.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId;
        const embed = new EmbedBuilder()
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true}) })
            .setTitle(`Message deleted in ${message.channel}`)
            .setDescription(`${message.content}` || '`Embed Message`')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({text: `ID: ${message.author.id}`})



        sendEmbed(message, messageLogsChannelId, embed);
    }
}

const GuildMessageDeleteBulk = {
    name: 'messageDeleteBulk',
    once: false,
    async execute(messages,channel) {
        let messages_content = ''
        const messageCount = messages.size
        const messageAuthor = messages.first().author
        const eventEmitter_Guild_Id = channel.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        messages.forEach(message => {
            messages_content += `> ${message.content || '`EMBED`'}\n`
        })
        const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId;
        const GuildMessageDeleteBulk_embed = new EmbedBuilder()
            .setAuthor({name: messageAuthor.tag, iconURL: messageAuthor.displayAvatarURL({dynamic: true}) })
            .setTitle(`${messageCount} Messages BulkDeleted in ${channel}`)
            .setDescription(`${messages_content}`)
            .setColor('#FF0000')
            .setTimestamp()
            // .setFooter({text: `ID: ${messages.author.id}`})
        sendEmbed(channel, messageLogsChannelId, GuildMessageDeleteBulk_embed);
    }
}

const GuildMessageUpdate = {
    name: 'messageUpdate',
    once: false,
    async execute(oldMessage, newMessage) {
        // limit to only user messages because bot keep editing messages due to deferReply & filter auto webhook embed by discord 
        if(oldMessage.author.bot || (oldMessage.attachments != newMessage.attachments && oldMessage.embeds != newMessage.embeds)) return;
        const eventEmitter_Guild_Id = oldMessage.guild.id;
        const guildsUsingLogger = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection();
        const loggerCollectionData = await loggerDbFunctionsManager.getChannelIds_Logger_Collection(eventEmitter_Guild_Id);
        if(!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return;
        const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId;
        const GuildMessageUpdate_embed = new EmbedBuilder()
            .setAuthor({name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL({dynamic: true}) })
            .setTitle(`Message edited in ${oldMessage.channel}`)
            .setDescription(`Before: ${oldMessage.content}\n+After: ${newMessage.content}`)
            .setColor('#FFFF00')    
            .setTimestamp()
            .setFooter({text: `ID: ${oldMessage.author.id}`})
            .setURL(oldMessage.url)
        sendEmbed(newMessage, messageLogsChannelId , GuildMessageUpdate_embed);
    }
}
module.exports = {
    GuildMessageDelete,
    GuildMessageDeleteBulk,
    GuildMessageUpdate
};