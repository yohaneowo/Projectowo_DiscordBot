


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message
const loggerDbFunctionsManager = new Logger_DatabaseFunction()



module.exports = {
  name: "messageDeleteBulk",
  once: false,
  async execute(messages, channel) {
    let messages_content = ""
    const messageCount = messages.size
    const messageAuthor = messages.first().author
    const eventEmitter_Guild_Id = channel.guild.id
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )
    messages.forEach((message) => {
      messages_content += `> ${message.content || "`EMBED`"}\n`
    })


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId
    const GuildMessageDeleteBulk_embed = new EmbedBuilder()
      .setAuthor({
        name: messageAuthor.tag,
        iconURL: messageAuthor.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`${messageCount} Messages BulkDeleted in ${channel}`)
      .setDescription(`${messages_content}`)
      .setColor("#FF0000")
      .setTimestamp()
    // .setFooter({text: `ID: ${messages.author.id}`})
    sendEmbed(channel, messageLogsChannelId, GuildMessageDeleteBulk_embed)
  }
}
