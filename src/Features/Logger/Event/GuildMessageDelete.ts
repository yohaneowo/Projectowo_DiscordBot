


import EmbedBuilder from "discord.js"
import db_LoggerCollection from "@dbFunc/db_LoggerCollection"
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")


module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (!message.guild) return
    const eventEmitter_Guild_Id = message.guild.id
    let guildsUsingLogger = await db_LoggerCollection.getGuildIds_LoggerCollection()
    const loggerCollectionData =
      await db_LoggerCollection.getChannelIds_Logger_Collection(eventEmitter_Guild_Id)


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const messageLogsChannelId = loggerCollectionData[0].messageLogsChannelId
    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`Message deleted in ${message.channel}`)
      .setDescription(`${message.content}` || "`Embed Message`")
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter({ text: `ID: ${message.author.id}` })

    sendEmbed(message, messageLogsChannelId, embed)
  }
}
