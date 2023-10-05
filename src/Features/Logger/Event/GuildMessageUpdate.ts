// Send to MessageLogs
import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "messageUpdate",
  once: false,
  async execute(oldMessage, newMessage) {
    if (
      oldMessage.author.bot ||
      (oldMessage.attachments != newMessage.attachments &&
        oldMessage.embeds != newMessage.embeds)
    )
      return
    // limit to only user messages because bot keep editing messages due to deferReply & filter auto webhook embed by discord
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    const eventEmitter_Guild_Id = oldMessage.guild.id
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return

    const messageLogsChannelId = await loggerDb.getMessageLogsChannelId(
      eventEmitter_Guild_Id
    )

    const GuildMessageUpdate_embed = new EmbedBuilder()
      .setAuthor({
        name: oldMessage.author.tag,
        iconURL: oldMessage.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`Message edited in ${oldMessage.channel}`)
      .setDescription(
        `Before: ${oldMessage.content}\n+After: ${newMessage.content}`
      )
      .setColor(0xffff00)
      .setTimestamp()
      .setFooter({ text: `ID: ${oldMessage.author.id}` })
      .setURL(oldMessage.url)
    loggerFunction.sendEmbed(
      newMessage,
      messageLogsChannelId,
      GuildMessageUpdate_embed
    )
  }
}
