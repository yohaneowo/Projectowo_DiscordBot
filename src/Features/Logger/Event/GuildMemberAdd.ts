// Send to joinleaveLogs
import * as loggerDb from "@dbFunc/db_LoggerCollection"
import { EmbedBuilder } from "@discordjs/builders"
import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    console.log("addmember")
    const eventEmitter_Guild_Id = member.guild.id
    const totalMembers = member.guild.memberCount
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const joinleaveLogsChannelId = await loggerDb.getJoinLeaveLogsChannelId(
      eventEmitter_Guild_Id
    )
    if (joinleaveLogsChannelId == null) return
    console.log(joinleaveLogsChannelId)

    const GuildMemberAdd_embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("Member Joined")
      .setDescription(
        `${member} ${totalMembers}nd to join Created Time${member.user.createdAt}`
      )
      .setColor(0x93c47d)
      .setTimestamp()
      .setFooter({ text: `ID: ${member.id}` })
    loggerFunction.sendEmbed(
      member,
      joinleaveLogsChannelId,
      GuildMemberAdd_embed
    )
  }
}
