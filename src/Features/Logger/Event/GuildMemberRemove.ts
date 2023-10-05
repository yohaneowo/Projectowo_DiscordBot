// Send to joinleaveLogs
import * as loggerDb from "@dbFunc/db_LoggerCollection"
import { EmbedBuilder } from "@discordjs/builders"
import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "guildMemberRemove",
  once: false,
  async execute(member) {
    const eventEmitter_Guild_Id = member.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const joinleaveLogsChannelId = await loggerDb.getJoinLeaveLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (joinleaveLogsChannelId == null) return

    const GuildMemberRemove_embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("Member Left")
      .setDescription(`${member} joined ${member.joinedAt} ago`)
      .setColor(0xe06666)
      .setTimestamp()
      .setFooter({ text: `ID: ${member.id}` })

    loggerFunction.sendEmbed(
      member,
      joinleaveLogsChannelId,
      GuildMemberRemove_embed
    )
  }
}
