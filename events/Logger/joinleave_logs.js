const { EmbedBuilder } = require("discord.js")
const {
  Logger_DatabaseFunction
} = require("../../commands_modules/logger/l_databaseFunctionManager.js")
const sendEmbed = require("../../commands_modules/logger/l_eventsFunction.js")
const loggerDbFunctionsManager = new Logger_DatabaseFunction()

const GuildMemberAdd = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    console.log("adddmember")
    const eventEmitter_Guild_Id = member.guild.id
    const totalMembers = member.guild.memberCount
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const GuildMemberAdd_embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("Member Joined")
      .setDescription(
        `${member} ${totalMembers}nd to join Created Time${member.user.createdAt}`
      )
      .setColor("#93c47d")
      .setTimestamp()
      .setFooter({ text: `ID: ${member.id}` })
    const joinleaveLogsChannelId =
      loggerCollectionData[0].joinleaveLogsChannelId
    console.log(
      `JOINLEAVE CHANNEL ID in guildmember add${joinleaveLogsChannelId}`
    )
    sendEmbed(member, joinleaveLogsChannelId, GuildMemberAdd_embed)
  }
}

const GuildMemberRemove = {
  name: "guildMemberRemove",
  once: false,
  async execute(member) {
    const GuildMemberRemove_embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setTitle("Member Left")
      .setDescription(`${member} joined ${member.joinedAt} ago`)
      .setColor("#e06666")
      .setTimestamp()
      .setFooter({ text: `ID: ${member.id}` })

    const eventEmitter_Guild_Id = member.guild.id
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const joinleaveLogsChannelId =
      loggerCollectionData[0].joinleaveLogsChannelId
    sendEmbed(member, joinleaveLogsChannelId, GuildMemberRemove_embed)
  }
}

module.exports = {
  GuildMemberAdd,
  GuildMemberRemove
}
