


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ChannelTyp... Remove this comment to see the full error message
const { ChannelType } = require("../../Utils/ChannelType.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message
const loggerDbFunctionsManager = new Logger_DatabaseFunction()



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'channelTyp... Remove this comment to see the full error message
const channelType = new ChannelType()


module.exports = {
  name: "channelCreate",
  once: false,
  async execute(channel) {
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        channel.guild.id
      )


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(channel.guild.id)) return
    const guildChannelCreate_embed = new EmbedBuilder()
      .setAuthor({
        name: channel.guild.name,
        iconURL: channel.guild.iconURL({ dynamic: true })
      })
      .setTitle(`Channel Created #${channel.name}`)
      .setDescription(
        `Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``
      )
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter({ text: `ID: ${channel.id}` })


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const serverLogsChannelId = loggerCollectionData[0].serverLogsChannelId
    sendEmbed(channel, serverLogsChannelId, guildChannelCreate_embed)
  }
}
