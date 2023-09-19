


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
// const channelType = new ChannelType()



module.exports = {
  name: "channelDelete",
  once: false,
  async execute(channel) {
    const eventEmitter_Guild_Id = channel.guild.id
    const channelType = new ChannelType()
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const guildChannelDelete_embed = new EmbedBuilder()
      .setAuthor({
        name: channel.guild.name,
        iconURL: channel.guild.iconURL({ dynamic: true })
      })
      .setTitle(`Channel Deleted #${channel.name}`)
      .setDescription(
        `Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``
      )
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter({ text: `ID: ${channel.id}` })


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const serverLogsChannelId = loggerCollectionData[0].serverLogsChannelId
    sendEmbed(channel, serverLogsChannelId, guildChannelDelete_embed)
  }
}
