


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'client'.
const client = require("../../../index.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require("sqlite3")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Permission... Remove this comment to see the full error message
const { PermissionsBitField, ChannelType } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DynamicVC_... Remove this comment to see the full error message
const DynamicVC_DatabaseManager = require("../dv_databaseFunctionManager.js")
async function createSubChannel(
  parameter,
  channel_name,
  parentId,
  ChannelType,
  PermissionsBitField
) {
  const maximumBitrate = parameter.guild.maximumBitrate

  const subChannel = parameter.guild.channels.create({
    name: channel_name,
    bitrate: `${maximumBitrate}`,
    type: ChannelType.GuildVoice,
    rtcRegion: "japan",
    permissionOverwrites: [
      {
        id: parameter.guild.roles.everyone,
        allow: [PermissionsBitField.Flags.ManageChannels]
      }
    ],
    parent: parentId
  })
  return subChannel
}



module.exports = {
  name: "voiceStateUpdate",
  once: false,
  async execute(oldState, newState) {
    if (newState.channel) {
      try {
        const channel_names = [
          "▬▬i═══════ﺤ",
          "ඞ ඞ ඞ ඞ ඞ ඞ ඞ",
          "█▬▬",
          "╾━╤ デ ╦︻",
          "︻╦̵̵͇̿̿̿̿╤──",
          "▄︻̷̿┻̿═━一",
          "【〞-ω･\\)︻┻┳══━一",
          "𓆝 𓆟 𓆞 𓆝 𓆟"
        ]
        const dynamicVC_DbFunctionManager = new DynamicVC_DatabaseManager()
        const guildsUsingDynamicVC =
          await dynamicVC_DbFunctionManager.getGuildIds_DynamicVC_Collection()
        const eventEmitter_Guild_Id = newState.guild.id



        if (guildsUsingDynamicVC.includes(eventEmitter_Guild_Id)) {
          const dynamicVC_Collection =
            await dynamicVC_DbFunctionManager.getDynamicVC_Collection(
              eventEmitter_Guild_Id
            )
          const mainChannel = await client.channels.cache.get(



            dynamicVC_Collection[0].Set_mainChannel_Id
          )



          const mainChannel_Id = dynamicVC_Collection[0].Set_mainChannel_Id



          dynamicVC_Collection.forEach(async (row) => {
            if (
              row.isAntiMuteChannel == 0 &&
              newState.channelId == row.Set_mainChannel_Id
            ) {
              const randomIndex = Math.floor(
                Math.random() * channel_names.length
              )
              const subChannel = await createSubChannel(
                newState,
                `${channel_names[randomIndex]}`,
                mainChannel.parentId,
                ChannelType,
                PermissionsBitField
              )
              await dynamicVC_DbFunctionManager.insertDynamicVC_subId(
                eventEmitter_Guild_Id,
                subChannel.id,
                0
              )
              let isMoved = false
              try {
                await newState
                  .setChannel(subChannel)
                  .then(() => (isMoved = true))
              } catch (err) {
                await dynamicVC_DbFunctionManager.deleteDynamicVC_subId(
                  subChannel.id
                )



                // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
                isMoved === true ? null : subChannel.delete()
              }
              dynamicVC_DbFunctionManager.updateDynamicVC_Collection_createCount(
                eventEmitter_Guild_Id
              )
            } else if (
              row.isAntiMuteChannel == 1 &&
              newState.channelId == row.Set_mainChannel_Id
            ) {
              const subChannel = await createSubChannel(
                newState,
                "MUTE禁止OWO",
                mainChannel.parentId,
                ChannelType,
                PermissionsBitField
              )
              await dynamicVC_DbFunctionManager.insertDynamicVC_subId(
                eventEmitter_Guild_Id,
                subChannel.id,
                1
              )
              let isMoved = false
              try {
                await newState
                  .setChannel(subChannel)
                  .then(() => (isMoved = true))
              } catch (err) {
                await dynamicVC_DbFunctionManager.deleteDynamicVC_subId(
                  subChannel.id
                )



                // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
                isMoved === true ? null : subChannel.delete()
              }
              dynamicVC_DbFunctionManager.updateDynamicVC_Collection_createCount(
                eventEmitter_Guild_Id
              )
            }
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (oldState.channel) {
      try {
        const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager()
        const Guild_Ids =
          await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId()
        const eventEmitter_Guild_Id = oldState.guild.id



        if (Guild_Ids.includes(eventEmitter_Guild_Id)) {
          const dynamicVC_subIds =
            await dynamicVC_DatabaseManager.getDynamicVC_subId(
              eventEmitter_Guild_Id
            )



          if (dynamicVC_subIds.includes(oldState.channelId)) {
            const subChannel = await client.guilds
              .fetch(oldState.guild.id)
              .then((guild) => guild.channels.fetch(oldState.channelId))
            oldState.channel.members.size == 0
              ? await dynamicVC_DatabaseManager
                  .deleteDynamicVC_subId(subChannel.id)
                  .then(() => subChannel.delete())
              : null
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    //
  }
}
