


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ChannelTyp... Remove this comment to see the full error message
const { ChannelType, PermissionsBitField } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require("sqlite3")
const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createChan... Remove this comment to see the full error message
  createChannel
} = require("../../commands_modules/misc/CreateChannel.js")


module.exports = async (interaction, client) => {
  try {
    if (!interaction.member.voice.channel) {
      return interaction.editReply({ content: "請先加入一個語音頻道" })
    } else {
      let normalChannelCount = 0
      let antiMuteChannelCount = 0

      const mainChannelCreatedCount =



        // @ts-expect-error TS(2304): Cannot find name 'dynamicVC_DbFunctionManager'.
        await dynamicVC_DbFunctionManager.checkMainChannel_CreatedCount_DynamicVC_Collection(



          // @ts-expect-error TS(2304): Cannot find name 'eventEmitter_Guild_Id'.
          eventEmitter_Guild_Id
        )
      console.log(mainChannelCreatedCount)
      mainChannelCreatedCount.forEach(async (row) => {
        if (row.isAntiMuteChannel == 0) {
          normalChannelCount = await row.count
        } else if (row.isAntiMuteChannel == 1) {
          antiMuteChannelCount = await row.count
        }
      })
      if (antiMuteChannelCount >= 1) {
        return interaction.editReply({ content: "已有一個永不Mute DynamicVC" })
      } else {
        const parentId = interaction.member.voice.channel.parentId
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        const createdAt = new Date()
        const permissionOverwrites = [
          {
            id: interaction.guild.roles.everyone,
            allow: [PermissionsBitField.Flags.ManageChannels]
          }
        ]
        const mainChannel = await createChannel(
          interaction,
          "【安静禁止】",
          "voiceChannel",
          permissionOverwrites,
          parentId
        )
        db.serialize(() => {
          db.run("INSERT INTO DynamicVC_Collection Values (?, ?, ?, ?, ?, ?)", [
            null,
            mainChannel.id,
            interaction.guild.id,
            createdAt,
            0,
            1
          ]),
            function (err) {
              if (err) {
                return console.log(err.message)
              }
            }
          db.close()
        })
        interaction.editReply({ content: "永不Mute DynamicVC已建立" })
      }
    }
  } catch (err) {
    console.error(err)
  }
}
