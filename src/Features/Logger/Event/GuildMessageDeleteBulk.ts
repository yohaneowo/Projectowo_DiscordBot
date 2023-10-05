import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "messageDeleteBulk",
  once: false,
  async execute(messages, channel) {
    let messages_content = ""
    const messageCount = messages.size
    const messageAuthor = messages.first().author
    const eventEmitter_Guild_Id = channel.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()

    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const messageLogsChannelId = await loggerDb.getMessageLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (messageLogsChannelId == null) return
    messages.forEach((message) => {
      messages_content += `> ${message.content || "`EMBED`"}\n`
    })

    const GuildMessageDeleteBulk_embed = new EmbedBuilder()
      .setAuthor({
        name: messageAuthor.tag,
        iconURL: messageAuthor.displayAvatarURL({ dynamic: true })
      })
      .setTitle(`${messageCount} Messages BulkDeleted in ${channel}`)
      .setDescription(`${messages_content}`)
      .setColor(0xff0000)
      .setTimestamp()
    // .setFooter({text: `ID: ${messages.author.id}`})
    loggerFunction.sendEmbed(
      channel,
      messageLogsChannelId,
      GuildMessageDeleteBulk_embed
    )
  }
}
