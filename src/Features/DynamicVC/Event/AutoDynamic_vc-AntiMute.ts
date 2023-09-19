


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'client'.
const client = require("../../../index.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sqlite3'.
const sqlite3 = require("sqlite3")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Permission... Remove this comment to see the full error message
const { PermissionsBitField, ChannelType } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DynamicVC_... Remove this comment to see the full error message
const DynamicVC_DatabaseManager = require("../dv_databaseFunctionManager.js")
const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager()



module.exports = {
  name: "voiceStateUpdate",
  once: false,
  async execute(oldState, newState) {
    const CHANNEL_TIMEOUT = 5 * 60 * 1000
    if (newState.selfMute) {
      try {
        const newState_ChannelId = newState.channelId
        const eventEmitter_Guild_Id = newState.guild.id
        const Guild_Ids =
          await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId()



        if (Guild_Ids.includes(eventEmitter_Guild_Id)) {
          const antiMuteDynamicVC_subIds =
            await dynamicVC_DatabaseManager.getAntiMute_DynamicVC_subId(
              eventEmitter_Guild_Id
            )



          if (antiMuteDynamicVC_subIds.includes(newState_ChannelId)) {
            newState.disconnect()
            // Currently unable to detect speaking without join voice
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
