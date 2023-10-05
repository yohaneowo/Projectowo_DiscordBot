import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

const { ChannelType } = require("../../Utils/ChannelType.js")
import loggerFunction from "../l_eventsFunction"
const channelType = new ChannelType()
// Send to serverLogs
module.exports = {
  name: "channelCreate",
  once: false,
  async execute(channel) {
    const eventEmitter_Guild_Id = channel.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(channel.guild.id)) return
    const serverLogsChannelId = await loggerDb.getServerLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (serverLogsChannelId == null) return
    const guildChannelCreate_Embed = new EmbedBuilder()
      .setAuthor({
        name: channel.guild.name,
        iconURL: channel.guild.iconURL({ dynamic: true })
      })
      .setTitle(`Channel Created #${channel.name}`)
      .setDescription(
        `Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``
      )
      .setColor(0x00ff00)
      .setTimestamp()
      .setFooter({ text: `ID: ${channel.id}` })

    loggerFunction.sendEmbed(
      channel,
      serverLogsChannelId,
      guildChannelCreate_Embed
    )
  }
}
