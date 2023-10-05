import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"
// Send to serverLogs
const { ChannelType } = require("../../Utils/ChannelType.js")
const channelType = new ChannelType()

module.exports = {
  name: "channelUpdate",
  once: false,
  async execute(oldChannel, newChannel) {
    const eventEmitter_Guild_Id = oldChannel.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    let embedFieldString_Before = ""
    let embedFieldString_After = ""

    const serverLogsChannelId = await loggerDb.getServerLogsChannelId(
      eventEmitter_Guild_Id
    )

    if (oldChannel.name !== newChannel.name) {
      embedFieldString_Before += `**Name :** ${oldChannel.name}\n`
      embedFieldString_After += `**Name :** ${newChannel.name}\n`
    } else {
      embedFieldString_Before += `**Name :** ${oldChannel.name}\n`
      embedFieldString_After += `**Name :** ${newChannel.name}\n`
      embedFieldString_Before += `**Permissions :**${
        oldChannel.permissionOverwrites || "None"
      }\n`
      embedFieldString_After += `**Permissions :**${
        newChannel.permissionOverwrites || "None"
      }\n`
    }
    if (oldChannel.topic !== newChannel.topic) {
      embedFieldString_Before += `**Topic :** ${oldChannel.topic || "None"}\n`
      embedFieldString_After += `**Topic :** ${newChannel.topic || "None"}\n`
    }
    if (oldChannel.nsfw !== newChannel.nsfw) {
      embedFieldString_Before += `**NSFW :** ${oldChannel.nsfw}\n`
      embedFieldString_After += `**NSFW :** ${newChannel.nsfw}\n`
    }
    if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
      embedFieldString_Before += `**Slowmode :** ${
        oldChannel.rateLimitPerUser || "None"
      }\n`
      embedFieldString_After += `**Slowmode :**${
        newChannel.rateLimitPerUser || "None"
      }\n`
    }
    if (oldChannel.parentId !== newChannel.parentId) {
      embedFieldString_Before += `**Category :**${
        oldChannel.parent.name || "None"
      }\n`
      embedFieldString_After += `**Category :**${
        newChannel.parent.name || "None"
      }\n`
    }

    if (oldChannel.position !== newChannel.position) {
      embedFieldString_Before += `**Position :**${oldChannel.position}\n`
      embedFieldString_After += `**Position :**${newChannel.position}\n`
    }
    if (oldChannel.bitrate !== newChannel.bitrate) {
      embedFieldString_Before += `**Bitrate :**${oldChannel.bitrate}\n`
      embedFieldString_After += `**Bitrate :**${newChannel.bitrate}\n`
    }
    if (oldChannel.userLimit !== newChannel.userLimit) {
      embedFieldString_Before += `**User Limit :**${oldChannel.userLimit}\n`
      embedFieldString_After += `**User Limit :**${newChannel.userLimit}\n`
    }
    if (oldChannel.rtcRegion !== newChannel.rtcRegion) {
      embedFieldString_Before += `**Region :**${oldChannel.rtcRegion}\n`
      embedFieldString_After += `**Region :**${newChannel.rtcRegion}\n`
    }
    if (oldChannel.type !== newChannel.type) {
      embedFieldString_Before += `**Type :**${oldChannel.type}\n`
      embedFieldString_After += `**Type :**${newChannel.type}\n`
    }
    if (oldChannel.rawPosition !== newChannel.rawPosition) {
      embedFieldString_Before += `**Raw Position :**${oldChannel.rawPosition}\n`
      embedFieldString_After += `**Raw Position :**${newChannel.rawPosition}\n`
    }

    const guildChannelUpdate_embed = new EmbedBuilder()
      .setTitle(`${channelType.getChannelTypeName(newChannel.type)} Updated`)
      .setColor(0x546eed)
      .addFields({
        name: "**Before**",
        value: `${embedFieldString_Before}`,
        inline: true
      })
      .addFields({
        name: "**After**",
        value: `${embedFieldString_After}`,
        inline: true
      })
      .setTimestamp()
      .setFooter({ text: `ID: ${oldChannel.id}` })

    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    loggerFunction.sendEmbed(
      oldChannel,
      serverLogsChannelId,
      guildChannelUpdate_embed
    )
  }
}
