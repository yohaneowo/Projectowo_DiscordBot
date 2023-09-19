


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message
const loggerDbFunctionsManager = new Logger_DatabaseFunction()


module.exports = {
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


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const joinleaveLogsChannelId =


      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      loggerCollectionData[0].joinleaveLogsChannelId
    sendEmbed(member, joinleaveLogsChannelId, GuildMemberRemove_embed)
  }
}
