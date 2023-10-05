// Send to VoiceLogs
import { EmbedBuilder, formatEmoji } from "@discordjs/builders"

import * as loggerDb from "@dbFunc/db_LoggerCollection"

import loggerFunction from "../l_eventsFunction"

module.exports = {
  name: "userUpdate",
  once: false,
  async execute(oldUser, newUser, client) {
    if (oldUser.avatarURL() !== newUser.avatarURL() && !oldUser.bot) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: newUser.tag,
          iconURL: newUser.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Avatar Update")
        .setDescription(`${newUser.tag}`)
        .setImage(newUser.displayAvatarURL({ dynamic: true }))
        .setColor(0x2986cc)
        .setTimestamp()
        .setFooter({ text: `ID: ${newUser.id}` })

      const memberLogs_Ids = await loggerDb.getGuildIds_LoggerCollection()
      client.guilds.cache.forEach(async (guild) => {
        const channel_Ids = Array.from(guild.channels.cache.values()).map(
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          (channel) => channel.id
        )
        let matchingChannel_Id
        channel_Ids.some((value) => {
          if (memberLogs_Ids.includes(value)) {
            matchingChannel_Id = value
            return true
          }
        })
        if (matchingChannel_Id) {
          guild.channels.fetch(matchingChannel_Id).then(async (channel) => {
            await channel.send({ embeds: [embed] })
          })
        }
      })
    }

    if (oldUser.username !== newUser.username && !oldUser.bot) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: newUser.tag,
          iconURL: newUser.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Username Update")
        .setDescription(`**${oldUser.username}** 🡺 **${newUser.username}**`)
        .setColor(0x2986cc)
        .setTimestamp()
        .setFooter({ text: `ID: ${newUser.id}` })

      const memberLogs_Ids =
        await loggerDb.getMemberLogs_Ids_Logger_Collection()
      client.guilds.cache.forEach(async (guild) => {
        const channel_Ids = Array.from(guild.channels.cache.values()).map(
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          (channel) => channel.id
        )
        let matchingChannel_Id
        channel_Ids.some((value) => {
          if (memberLogs_Ids.includes(value)) {
            matchingChannel_Id = value
            return true
          }
        })
        if (matchingChannel_Id) {
          guild.channels.fetch(matchingChannel_Id).then(async (channel) => {
            await channel.send({ embeds: [embed] })
          })
        }
      })
    }
  }
}
