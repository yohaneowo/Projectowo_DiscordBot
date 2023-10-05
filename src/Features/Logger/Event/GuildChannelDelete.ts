import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

const { ChannelType } = require("../../Utils/ChannelType.js")
import loggerFunction from "../l_eventsFunction"
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message

// const channelType = new ChannelType()
// Send to serverLogs
module.exports = {
  name: "channelDelete",
  once: false,
  async execute(channel) {
    const eventEmitter_Guild_Id = channel.guild.id
    const channelType = new ChannelType()
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return

    const serverLogsChannelId = await loggerDb.getServerLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (serverLogsChannelId == null) return
    const guildChannelDelete_Embed = new EmbedBuilder()
      .setAuthor({
        name: channel.guild.name,
        iconURL: channel.guild.iconURL({ dynamic: true })
      })
      .setTitle(`Channel Deleted #${channel.name}`)
      .setDescription(
        `Channel Type : \`${channelType.getChannelTypeName(channel.type)}\``
      )
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter({ text: `ID: ${channel.id}` })

    loggerFunction.sendEmbed(
      channel,
      serverLogsChannelId,
      guildChannelDelete_Embed
    )
  }
}
