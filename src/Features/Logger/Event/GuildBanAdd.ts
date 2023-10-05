import * as loggerDb from "@dbFunc/db_LoggerCollection"

import { EmbedBuilder } from "@discordjs/builders"
import loggerFunction from "../l_eventsFunction"
// Send to memberLogs
module.exports = {
  name: "guildBanAdd",
  once: false,
  async execute(guildBan) {
    console.log("ban test1")

    const eventEmitter_Guild_Id = guildBan.guild.id
    const guildsUsingLogger = await loggerDb.getGuildIds_LoggerCollection(
      eventEmitter_Guild_Id
    )
    console.log("ban test1.5")

    const user = guildBan.user
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    console.log("ban test1.7")

    const memberLogsChannelId =
      await loggerDb.getMemberLogsChannelId_LoggerCollection(
        eventEmitter_Guild_Id
      )
    console.log(`memberLogsChannelId: ${memberLogsChannelId}`)
    if (memberLogsChannelId == null) return
    console.log("ban test2")

    const GuildBanAdd_Embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("Member Banned")
      .setDescription(`**${user.tag}** has been banned from the server.`)
      .addFields({
        name: "Reason",
        value: `${guildBan.reason}` || "No reason provided"
      })
      .setColor(0x2986cc)
      .setTimestamp()
      .setFooter({ text: `ID: ${user.id}` })

    loggerFunction.sendEmbed(guildBan, memberLogsChannelId, GuildBanAdd_Embed)
    console.log("ban test3")
  }
}
