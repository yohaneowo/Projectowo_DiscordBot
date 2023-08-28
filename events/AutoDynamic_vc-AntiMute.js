const client = require("../index.js");
const sqlite3 = require("sqlite3");
const { PermissionsBitField, ChannelType } = require("discord.js");
const {
  DynamicVC_DatabaseManager
} = require("../commands_modules/dynamic-voicechannel/dv_databaseFunctionManager.js");
const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();

const client = require("../index.js")
const sqlite3 = require("sqlite3")
const { PermissionsBitField, ChannelType } = require("discord.js")
const {
  DynamicVC_DatabaseManager
} = require("../commands_modules/dynamic-voicechannel/dv_databaseFunctionManager.js")
const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager()

module.exports = {
  name: "voiceStateUpdate",
  once: false,
  async execute(oldState, newState) {
    const CHANNEL_TIMEOUT = 5 * 60 * 1000;
    if (newState.selfMute) {
      try {
        const newState_ChannelId = newState.channelId;
        const eventEmitter_Guild_Id = newState.guild.id;
        const Guild_Ids =
          await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId();
        if (Guild_Ids.includes(eventEmitter_Guild_Id)) {
          const antiMuteDynamicVC_subIds =
            await dynamicVC_DatabaseManager.getAntiMute_DynamicVC_subId(
              eventEmitter_Guild_Id
            );
          if (antiMuteDynamicVC_subIds.includes(newState_ChannelId)) {
            newState.disconnect();
            // Currently unable to detect speaking without join voice
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};
