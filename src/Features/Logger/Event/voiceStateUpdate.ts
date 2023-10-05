// Send to VoiceLogs
import { EmbedBuilder, formatEmoji } from "@discordjs/builders"

import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "voiceStateUpdate",
  once: false,
  async execute(oldState, newState) {
    const eventEmitter_Guild_Id = oldState.guild.id
    const guild_ids = await loggerDb.getGuildIds_LoggerCollection()
    if (!guild_ids.includes(eventEmitter_Guild_Id)) return

    const voiceLogsChannelId = await loggerDb.getVoiceLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (voiceLogsChannelId == null) return

    if (newState.member && !newState.channel) {
      const member = newState.member
      const voiceState_Left_embed = new EmbedBuilder()
        .setAuthor({
          name: member.user.tag,
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Member Left Voice Channel")
        .setDescription(
          `**${member.user.tag}** left <:vc:1098318595773186191> ${oldState.channel.name}`
        )
        .setColor(0xff0000)
        .setTimestamp()
        .setFooter({ text: `ID: ${member.id}` })

      loggerFunction.sendEmbed(
        oldState,
        voiceLogsChannelId,
        voiceState_Left_embed
      )
    } else if (newState.member && newState.channel && !oldState.channel) {
      const member = newState.member
      const voiceState_Joined_embed = new EmbedBuilder()
        .setAuthor({
          name: member.user.tag,
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Member Joined Voice Channel")
        .setDescription(
          `**${member.user.tag}** joined <:vc:1098318595773186191> ${newState.channel.name}`
        )
        .setColor(0x00ff00)
        .setTimestamp()
        .setFooter({ text: `ID: ${member.id}` })
      loggerFunction.sendEmbed(
        oldState,
        voiceLogsChannelId,
        voiceState_Joined_embed
      )
    } else if (oldState.channel != newState.channel) {
      const voiceState_Moved_embed = new EmbedBuilder()
        .setAuthor({
          name: oldState.member.user.tag,
          iconURL: oldState.member.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Member Moved Voice Channel")
        .setDescription(
          `**Before** : ${formatEmoji("1098318595773186191")} ${
            oldState.channel.name
          }\n **         **⮑**After** : ${formatEmoji("1098318595773186191")} ${
            newState.channel.name
          }`
        )
        .setColor(0x1034a6)
        .setTimestamp()
        .setFooter({ text: `ID: ${oldState.member.id}` })

      loggerFunction.sendEmbed(
        oldState,
        voiceLogsChannelId,
        voiceState_Moved_embed
      )
    }
  }
}
