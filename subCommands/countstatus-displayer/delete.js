const { SlashCommandSubcommandBuilder  } = require('@discordjs/builders');
const { MemberCount_DatabaseFunctions } = require('../../commands_modules/count_status/cs_databaseFunctionManager.js');
const { Error_Embed } = require('../../embed_modules/error/error_embed.js');


module.exports = 
    async (interaction, client) => {
        // declare database function manager
        const databaseFunctionManager = new MemberCount_DatabaseFunctions();
        const errorEmbed = new Error_Embed();
        try {
            // await interaction.deferReply({ ephemeral: false })
            const guild_Id = await interaction.guild.id;
            // Gets the select values and channel id from the database
            const [selectValues, channelId] = await Promise.all([
                databaseFunctionManager.get_MemberCount_SelectValue(guild_Id),
                databaseFunctionManager.get_MemberCount_ChannelId(guild_Id),
            ]);
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
                errorEmbed.sendChannelError(interaction, error);
                console.error(`找不到頻道 `);
            }
            // selectValues is a object with comma separated values
            selectValues.toString().split(',').forEach(async (value) => {
                switch (value) {
                    case '0' :
                        // get channel via id
                        const allMemberCount_Channel = await interaction.guild.channels.fetch(channelId[0].All_Members_Count_Id)
                        // if channel exists, delete it
                        if (allMemberCount_Channel) {
                        await allMemberCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${allMemberCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${allMemberCount_Channel.name} 時發生錯誤：`, error);});
                            } else {console.error(`找不到頻道 `);}
                        break;a
                    case '1' :
                        const usersCount_Channel = await interaction.guild.channels.fetch(channelId[0].Users_Count_Id)
                        if (usersCount_Channel) {
                            await usersCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${usersCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${usersCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '2' :
                        const botsCount_Channel = await interaction.guild.channels.fetch(channelId[0].Bots_Count_Id)
                        if (botsCount_Channel) {
                            await botsCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${botsCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${botsCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '3' :
                        const allOnlineCount_Channel = await interaction.guild.channels.fetch(channelId[0].All_Online_Count_Id)
                        if (allOnlineCount_Channel) {
                            await allOnlineCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${allOnlineCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${allOnlineCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '4' :
                        const allOnlineCount_Idle_included_Channel = await interaction.guild.channels.fetch(channelId[0].All_Online_Count_include_idle_Id)
                        if (allOnlineCount_Idle_included_Channel) {
                            await allOnlineCount_Idle_included_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${allOnlineCount_Idle_included_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${allOnlineCount_Idle_included_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '5' :
                        const allOnlineCount_Idle_Dnd_included_Channel = await interaction.guild.channels.fetch(channelId[0].All_Online_Count_include_idle_dnd_Id)
                        if (allOnlineCount_Idle_Dnd_included_Channel) {
                            await allOnlineCount_Idle_Dnd_included_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${allOnlineCount_Idle_Dnd_included_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${allOnlineCount_Idle_Dnd_included_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '6' :
                        const allOfflineCount_Channel = await interaction.guild.channels.fetch(channelId[0].All_Offline_Count_Id)
                        if (allOfflineCount_Channel) {
                            await allOfflineCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${allOfflineCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${allOfflineCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '7' :
                    const userOnlineCount_Channel = await interaction.guild.channels.fetch(channelId[0].User_Online_Count_Id)
                    if (userOnlineCount_Channel) {
                        await userOnlineCount_Channel.delete()
                        .then(() => {console.log(`成功刪除頻道 ${userOnlineCount_Channel.name}`);})
                        .catch(error => {console.error(`刪除頻道 ${userOnlineCount_Channel.name} 時發生錯誤：`, error);});
                    } else {console.error(`找不到頻道 `);}
                    break;
                    case '8' :
                        const userOnlineCount_Idle_included_Channel = await interaction.guild.channels.fetch(channelId[0].User_Online_Count_include_idle_Id)
                        if (userOnlineCount_Idle_included_Channel) {
                            await userOnlineCount_Idle_included_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${userOnlineCount_Idle_included_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${userOnlineCount_Idle_included_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                    break;
                    case '9' :
                        const userOnlineCount_Idle_Dnd_included_Channel = await interaction.guild.channels.fetch(channelId[0].User_Online_Count_include_idle_dnd_Id)
                        if (userOnlineCount_Idle_Dnd_included_Channel) {
                            await userOnlineCount_Idle_Dnd_included_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${userOnlineCount_Idle_Dnd_included_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${userOnlineCount_Idle_Dnd_included_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '10' :
                        const userIdleCount_Channel = await interaction.guild.channels.fetch(channelId[0].User_Idle_Count_Id)
                        if (userIdleCount_Channel) {
                            await userIdleCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${userIdleCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${userIdleCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '11' :
                        const userDndCount_Channel = await interaction.guild.channels.fetch(channelId[0].User_Dnd_Count_Id)
                        if (userDndCount_Channel) {
                            await userDndCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${userDndCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${userDndCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    case '12' :
                        const userOfflineCount_Channel = await interaction.guild.channels.fetch(channelId[0].User_Offline_Count_Id)
                        if (userOfflineCount_Channel) {
                            await userOfflineCount_Channel.delete()
                            .then(() => {console.log(`成功刪除頻道 ${userOfflineCount_Channel.name}`);})
                            .catch(error => {console.error(`刪除頻道 ${userOfflineCount_Channel.name} 時發生錯誤：`, error);});
                        } else {console.error(`找不到頻道 `);}
                        break;
                    default:
                        throw new Error('未知的選項值');
                        break;
                }
            })
            // delete channel id from database
            await databaseFunctionManager.delete_MemberCount_ChannelId(guild_Id)
            // edit since already use deferReply
            await interaction.editReply({content: `成功刪除頻道`, ephemeral: false});
        } catch (error) {
            console.error(error)
        }
    }
