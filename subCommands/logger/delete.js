const {Logger_DatabaseFunction} = require(`../../commands_modules/logger/l_databaseFunctionManager.js`);

module.exports = 
    async (interaction, client) => {
        // declare database function manager
        const databaseFunctionManager = new Logger_DatabaseFunction();
        try {
            
            // await interaction.reply(';dsadsad')
            // await interaction.deferReply({ ephemeral: false })
            const guild_Id = await interaction.guild.id;
            // Gets the select values and channel id from the database
            const [selectValues, channelId, Guild_ids] = await Promise.all([
                databaseFunctionManager.getSelectValues_Logger_Collection(guild_Id),
                databaseFunctionManager.getChannelIds_Logger_Collection(guild_Id),
                databaseFunctionManager.getGuild_Ids_Logger_Collection()
            ]);
                if(Guild_ids.includes(guild_Id)) {
                    try {
                        // delete the category channel individually
                        const channelCategory = await interaction.guild.channels.fetch(channelId[0].Category_Id);
                        if (channelCategory) {
                            await channelCategory.delete()
                            .then(() => {console.log(`成功刪除頻道 ${channelCategory.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${channelCategory.name} 時發生錯誤：`, error);});
                        } else {
                            console.error(`找不到頻道 ${channelId[0].Category_Id}`);
                        }
                    } catch (error) { 
                        console.error(`找不到頻道 `);
                    }
                    // selectValues is a object with comma separated values

                    selectValues.toString().split(',').forEach(async (value) => {
                        switch (value) {
                            case '0' :
                                // get channel via id
                                const channelCreate_Channel = await interaction.guild.channels.fetch(channelId[0].channelCreate_Id)
                                // if channel exists, delete it
                                if (channelCreate_Channel) {
                                await channelCreate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${channelCreate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${channelCreate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '1' :
                                const channelUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].channelUpdate_Id)
                                if (channelUpdate_Channel) {
                                await channelUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${channelUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${channelUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '2' :
                                const channelDelete_Channel = await interaction.guild.channels.fetch(channelId[0].channelDelete_Id)
                                if (channelDelete_Channel) {
                                await channelDelete_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${channelDelete_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${channelDelete_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '3' :
                                const guildBanAdd_Channel = await interaction.guild.channels.fetch(channelId[0].guildBanAdd_Id)
                                if (guildBanAdd_Channel) {
                                await guildBanAdd_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildBanAdd_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildBanAdd_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '4' :
                                const guildBanRemove_Channel = await interaction.guild.channels.fetch(channelId[0].guildBanRemove_Id)
                                if (guildBanRemove_Channel) {
                                await guildBanRemove_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildBanRemove_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildBanRemove_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '5' :
                                const guildRoleCreate_Channel = await interaction.guild.channels.fetch(channelId[0].guildRoleCreate_Id)
                                if (guildRoleCreate_Channel) {
                                await guildRoleCreate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildRoleCreate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildRoleCreate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '6' :
                                const guildRoleDelete_Channel = await interaction.guild.channels.fetch(channelId[0].guildRoleDelete_Id)
                                if (guildRoleDelete_Channel) {
                                await guildRoleDelete_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildRoleDelete_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildRoleDelete_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '7' :
                                const guildRoleUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].guildRoleUpdate_Id)
                                if (guildRoleUpdate_Channel) {
                                await guildRoleUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildRoleUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildRoleUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '8' :
                                const guildUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].guildUpdate_Id)
                                if (guildUpdate_Channel) {
                                await guildUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '9' :
                                const messageDelete_Channel = await interaction.guild.channels.fetch(channelId[0].messageDelete_Id)
                                if (messageDelete_Channel) {
                                await messageDelete_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${messageDelete_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${messageDelete_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '10' :
                                const messageDeleteBulk_Channel = await interaction.guild.channels.fetch(channelId[0].messageDeleteBulk_Id)
                                if (messageDeleteBulk_Channel) {
                                await messageDeleteBulk_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${messageDeleteBulk_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${messageDeleteBulk_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '11' :
                                const messageUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].messageUpdate_Id)
                                if (messageUpdate_Channel) {
                                await messageUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${messageUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${messageUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '12' :
                                const guildMemberAdd_Channel = await interaction.guild.channels.fetch(channelId[0].guildMemberAdd_Id)
                                if (guildMemberAdd_Channel) {
                                await guildMemberAdd_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildMemberAdd_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildMemberAdd_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '13' :
                                const guildMemberKick_Channel = await interaction.guild.channels.fetch(channelId[0].guildMemberKick_Id)
                                if (guildMemberKick_Channel) {
                                await guildMemberKick_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildMemberKick_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildMemberKick_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '14' :
                                const guildMemberRemove_Channel = await interaction.guild.channels.fetch(channelId[0].guildMemberRemove_Id)
                                if (guildMemberRemove_Channel) {
                                await guildMemberRemove_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildMemberRemove_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildMemberRemove_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '15' :
                                const guildMemberUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].guildMemberUpdate_Id)
                                if (guildMemberUpdate_Channel) {
                                await guildMemberUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildMemberUpdate_Channel.name}`);}) 
                                    .catch(error => {console.error(`刪除頻道 ${guildMemberUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '16' :
                                const guildMemberNickUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].guildMemberNickUpdate_Id)
                                if (guildMemberNickUpdate_Channel) {
                                await guildMemberNickUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildMemberNickUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildMemberNickUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '17' :
                                const voiceChannelLeave_Channel = await interaction.guild.channels.fetch(channelId[0].voiceChannelLeave_Id)
                                if (voiceChannelLeave_Channel) {
                                await voiceChannelLeave_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${voiceChannelLeave_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${voiceChannelLeave_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '18' :
                                const voiceChannelJoin_Channel = await interaction.guild.channels.fetch(channelId[0].voiceChannelJoin_Id)
                                if (voiceChannelJoin_Channel) {
                                await voiceChannelJoin_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${voiceChannelJoin_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${voiceChannelJoin_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '19' :
                                const voiceStateUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].voiceStateUpdate_Id)
                                if (voiceStateUpdate_Channel) {
                                await voiceStateUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${voiceStateUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${voiceStateUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '20' :
                                const voiceChannelSwitch_Channel = await interaction.guild.channels.fetch(channelId[0].voiceChannelSwitch_Id)
                                if (voiceChannelSwitch_Channel) {
                                await voiceChannelSwitch_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${voiceChannelSwitch_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${voiceChannelSwitch_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            case '21' :
                                const guildEmojisUpdate_Channel = await interaction.guild.channels.fetch(channelId[0].guildEmojisUpdate_Id)
                                if (guildEmojisUpdate_Channel) {
                                await guildEmojisUpdate_Channel.delete()
                                    .then(() => {console.log(`成功刪除頻道 ${guildEmojisUpdate_Channel.name}`);})
                                    .catch(error => {console.error(`刪除頻道 ${guildEmojisUpdate_Channel.name} 時發生錯誤：`, error);});
                                    } else {console.error(`找不到頻道 `);}
                                break;
                            default:
                                break;
                        }
                    })
                    // delete channel id from database
                    await databaseFunctionManager.delete_Logger_Collection(guild_Id)
                    await interaction.editReply({content: `删除完成`, ephemeral: false})
                } else {
                    await interaction.editReply({content: `你好像没有设置过噢`, ephemeral: false})
                }
            // edit since already use deferReply
        } catch (error) {
            console.error(error)
        }
    }
