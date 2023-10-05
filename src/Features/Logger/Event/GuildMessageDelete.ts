// Send to MessageLogs
import { EmbedBuilder } from "discord.js"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (!message.guild) return
    const eventEmitter_Guild_Id = message.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return

    const messageLogsChannelId = await loggerDb.getMessageLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (messageLogsChannelId == null) return
    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`Message deleted in ${message.channel}`)
      .setDescription(`${message.content}` || "`Embed Message`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter({ text: `ID: ${message.author.id}` })

    loggerFunction.sendEmbed(message, messageLogsChannelId, embed)
  }
}
