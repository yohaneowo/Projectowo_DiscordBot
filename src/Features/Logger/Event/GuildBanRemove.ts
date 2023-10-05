import { EmbedBuilder } from "@discordjs/builders"
import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"
// Send to memberLogs
module.exports = {
  name: "guildBanRemove",
  once: false,
  async execute(guildBan) {
    console.log("unban test0.5")

    const user = guildBan.user
    const eventEmitter_Guild_Id = guildBan.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection()
    console.log("unban test0.7")

    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    console.log("unban test0.8")

    const memberLogsChannelId =
      await loggerDb.getMemberLogsChannelId_LoggerCollection(
        eventEmitter_Guild_Id
      )
    console.log(`memberLogsChannelId: ${memberLogsChannelId}`)
    if (memberLogsChannelId == null) return
    console.log("unban test1")
    const GuildBanRemove_Embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("User Unbanned")
      .setDescription(`**${user.tag}** has been unbanned from the server.`)
      .addFields({
        name: "Reason",
        value: `${guildBan.reason}` || "No reason provided"
      })
      .setColor(0x2986cc)
      .setTimestamp()
      .setFooter({ text: `ID: ${user.id}` })
    console.log("unban test2")
    loggerFunction.sendEmbed(
      guildBan,
      memberLogsChannelId,
      GuildBanRemove_Embed
    )
    console.log("unban test3")
  }
}
