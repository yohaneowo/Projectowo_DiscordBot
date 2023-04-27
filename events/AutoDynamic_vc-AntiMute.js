// const client = require('../index.js');  
// const sqlite3 = require('sqlite3');
// const {PermissionsBitField, ChannelType} = require('discord.js');
// const {DynamicVC_DatabaseManager} = require('../commands_modules/dynamic-voicechannel/dv_databaseFunctionManager.js');

// module.exports = {
//     name: 'voiceStateUpdate',
//     once: false,
//     async execute(oldState, newState) {
//         if(newState.selfMute) {
//             try {
//                 const dynamicVC_DatabaseManager = new DynamicVC_DatabaseManager();
//                 const Guild_Ids = await dynamicVC_DatabaseManager.getGuildIds_DynamicVC_subId();
//                 const Guild_Id = newState.guild.id;
//                 if(Guild_Ids.includes(Guild_Id)){
//                     const dynamicVC_subIds = await dynamicVC_DatabaseManager.getDynamicVC_subId(Guild_Id);
//                     if(dynamicVC_subIds.includes(newState.channelId)) {
//                         newState.disconnect()
//                     }
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }