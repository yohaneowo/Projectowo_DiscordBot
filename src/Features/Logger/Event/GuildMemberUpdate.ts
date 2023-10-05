//  Send to MemberLogs
import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"
module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const eventEmitter_Guild_Id = oldMember.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()

    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const memberLogsChannelId =
      await loggerDb.getMemberLogsChannelId_LoggerCollection(
        eventEmitter_Guild_Id
      )
    if (memberLogsChannelId == null) return
    if (oldMember.nickname !== newMember.nickname) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: newMember.user.tag,
          iconURL: newMember.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Nickname Update")
        .setDescription(`**${oldMember.nickname}** 🡺 **${newMember.nickname}**`)
        .setColor(0x2986cc)
        .setTimestamp()
        .setFooter({ text: `ID: ${newMember.id}` })
      loggerFunction.sendEmbed(oldMember, memberLogsChannelId, embed)
    } else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
      const oldRoles = new Set(oldMember.roles.cache.values())
      const newRoles = new Set(newMember.roles.cache.values())
      const addedRoles = [...newRoles].filter((role) => !oldRoles.has(role))
      const removedRoles = [...oldRoles].filter((role) => !newRoles.has(role))

      const GuildMemberUpdate_embed = new EmbedBuilder()
        .setAuthor({
          name: newMember.user.tag,
          iconURL: newMember.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Role Update")
        .setColor(0x2986cc)
        .setTimestamp()
        .setFooter({ text: `ID: ${newMember.id}` })
      if (addedRoles.length > 0) {
        GuildMemberUpdate_embed.setDescription(`**+${addedRoles}**`)
      } else if (removedRoles) {
        GuildMemberUpdate_embed.setDescription(`**-${removedRoles}**`)
      }
      loggerFunction.sendEmbed(
        oldMember,
        memberLogsChannelId,
        GuildMemberUpdate_embed
      )
    }
  }
}
