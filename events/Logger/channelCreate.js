const sqlite3 = require('sqlite3').verbose();
const {EmbedBuilder} = require('discord.js');
const {Logger_DatabaseFunction} = require('../../commands_modules/logger/l_databaseFunctionManager.js');
const {ChannelType} = require('../../commands_modules/misc/ChannelType.js')
module.exports = {
    name : "channelCreate",
    once : false,
    async execute(channel, client) {
        const channelType = new ChannelType();
        const databaseFunctionManager = new Logger_DatabaseFunction();
        const guild_ids = await databaseFunctionManager.getGuild_Ids_Logger_Collection();
        const channelId = await databaseFunctionManager.getChannelIds_Logger_Collection(channel.guild.id);
        if(!guild_ids.includes(channel.guild.id)) return;
        const embed = new EmbedBuilder()
            .setAuthor({name: channel.guild.name, iconURL: channel.guild.iconURL({dynamic: true}) })
            .setTitle(`Channel Created #${channel.name}`)
            .setDescription(`Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``)
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter({text: `ID: ${channel.id}`})
                
        channel.guild.channels.fetch(channelId[0].channelCreate_Id).then(async channel => {
            // console.log(channel);
           
            await channel.send({embeds: [embed]})
        })
    }
}
