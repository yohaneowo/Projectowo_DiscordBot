


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message
const loggerDbFunctionsManager = new Logger_DatabaseFunction()



module.exports = {
  name: "messageUpdate",
  once: false,
  async execute(oldMessage, newMessage) {
    // limit to only user messages because bot keep editing messages due to deferReply & filter auto webhook embed by discord
    if (
      oldMessage.author.bot ||
      (oldMessage.attachments != newMessage.attachments &&
        oldMessage.embeds != newMessage.embeds)
    )
      return
    const eventEmitter_Guild_Id = oldMessage.guild.id
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId
    const GuildMessageUpdate_embed = new EmbedBuilder()
      .setAuthor({
        name: oldMessage.author.tag,
        iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`Message edited in ${oldMessage.channel}`)
      .setDescription(
        `Before: ${oldMessage.content}\n+After: ${newMessage.content}`
      )
      .setColor("#FFFF00")
      .setTimestamp()
      .setFooter({ text: `ID: ${oldMessage.author.id}` })
      .setURL(oldMessage.url)
    sendEmbed(newMessage, messageLogsChannelId, GuildMessageUpdate_embed)
  }
}
