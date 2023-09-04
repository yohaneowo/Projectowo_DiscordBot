const { ChannelType, PermissionsBitField } = require("discord.js")
const DynamicVC_DatabaseManager = require("../../commands_modules/dynamic-voicechannel/dv_databaseFunctionManager.js")
const sqlite3 = require("sqlite3")
const {
  createChannel
} = require("../../commands_modules/misc/CreateChannel.js")
module.exports = async (interaction) => {
  try {
    const eventEmitter_Guild_Id = interaction.guild.id
    const dynamicVC_DbFunctionManager = new DynamicVC_DatabaseManager()
    if (!interaction.member.voice.channel) {
      return interaction.editReply({ content: "請先加入一個語音頻道" })
    } else {
      let normalChannelCount = 0
      let antiMuteChannelCount = 0

      const mainChannelCreatedCount =
        await dynamicVC_DbFunctionManager.checkMainChannel_CreatedCount_DynamicVC_Collection(
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
      if (normalChannelCount >= 1) {
        return interaction.editReply({ content: "已有一個DynamicVC" })
      } else {
        const parentId = interaction.member.voice.channel.parentId
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        const permissionOverwrites = [
          {
            id: interaction.guild.roles.everyone,
            allow: [PermissionsBitField.Flags.ManageChannels]
          }
        ]
        const createdAt = new Date()
        const mainChannel = await createChannel(
          interaction,
          "陰謀論生成區",
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
            0
          ]),
            function (err) {
              if (err) {
                return console.log(err.message)
              }
            }
          db.close()
        })
        interaction.editReply({ content: "DynamicVC已建立" })
      }
    }
  } catch (err) {
    console.error(err)
  }
}
