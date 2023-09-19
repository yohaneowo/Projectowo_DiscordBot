


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")
// const loggerDbFunctionsManager = new Logger_DatabaseFunction()



module.exports = {
  name: "guildBanRemove",
  once: false,
  async execute(guildBan) {
    const user = guildBan.user
    const GuildBanRemove_embed = new EmbedBuilder()
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
      .setColor("#2986cc")
      .setTimestamp()
      .setFooter({ text: `ID: ${user.id}` })

    const eventEmitter_Guild_Id = guildBan.guild.id
    const databaseFunctionManager = new Logger_DatabaseFunction()
    const guildsUsingLogger =
      await databaseFunctionManager.getGuild_Ids_Logger_Collection()
    const loggerCollectionData =
      await databaseFunctionManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const memberLogsChannelId = loggerCollectionData[0].memberLogsChannelId
    sendEmbed(guildBan, memberLogsChannelId, GuildBanRemove_embed)
  }
}
