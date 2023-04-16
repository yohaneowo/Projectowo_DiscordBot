const { SlashCommandSubcommandBuilder , EmbedBuilder, ComponentType } = require('discord.js');
const {Logger_ManageFunction} = require(`../../commands_modules/logger/l_channelFunctionManager.js`);
const {Logger_DatabaseFunction} = require(`../../commands_modules/logger/l_databaseFunctionManager.js`);
const {Logger_Interaction_Component, Logger_Channel_Ids} = require('../../commands_modules/logger/l.component.js');

// 可能会出现的问题=达到channel上限
module.exports =  
        async (interaction, client) => {
        // declare function managers

        const logger_FunctionManager = new Logger_ManageFunction;
        const logger_DatabaseFunction = new Logger_DatabaseFunction;
        const selectMenu = new Logger_Interaction_Component().Select_Menu;
        const button = new Logger_Interaction_Component().Button;
        const msg = await interaction.editReply({ content: 'Select [Logger] to display', components: [selectMenu, button] });
        let isMenuSelect = false;
        let selectMenu_Values = [];
		
        const menuCollector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });
        menuCollector.on('collect',async i => {
            // Check if the user who selected the select menu is the same user who used the command
            if (i.user.id === interaction.user.id) {
                await i.deferUpdate();
                // Temp Storing the values of select menu
                selectMenu_Values = i.values; 
                // Since values are collected means select menu is selected
                isMenuSelect = true;
            } else {
                i.reply({ content: `These Selection aren't for you!`, ephemeral: true });
            }
        });
            menuCollector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        }); 
        // Collector Event for Button
        const Button_collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });
        Button_collector.on('collect',async i => {
            // Check if the user who selected the select menu is the same user who used the command
            if (i.user.id === interaction.user.id) {
                // Check Menu is selected or not , if not then send error message
                if (isMenuSelect) {
                    // Get all the ids of the guilds in database
                    const Guild_Ids = await logger_DatabaseFunction.getGuild_Ids_Logger_Collection()
                    console.log(Guild_Ids)
                    const guild_Id = interaction.guild.id;
                    if (!Guild_Ids.includes(guild_Id.toString())) {
                    console.log(`${guild_Id} in ${Guild_Ids}?`)
                        const logger_constructor = new Logger_Channel_Ids();
                            await new Promise (async (resolve, reject) => {
                                const parent =  await logger_FunctionManager.createChannel(interaction, 'Category') 
                                logger_constructor.Guild_Id = guild_Id.toString();
                                logger_constructor.Category_Id = parent.id.toString();
                                resolve(parent)
                            }).then(async (parent) => {
                                console.log(selectMenu_Values)
                                for (let value of selectMenu_Values) {
                                    switch (value) {
                                        case '0':
                                            console.log(`SQQQQASA`)
                                            let channelCreate = await logger_FunctionManager.createChannel(interaction, 'channelCreate', parent);
                                            console.log(`SASA${channelCreate}`)

                                            logger_constructor.channelCreate_Id = channelCreate.id.toString();
                                            console.log('case 0 done')
                                        break;
                                        case '1':
                                            let channelUpdate = await logger_FunctionManager.createChannel(interaction, 'channelUpdate', parent);
                                            logger_constructor.channelUpdate_Id = channelUpdate.id.toString();
                                            console.log('case 1 done')
                                        break;
                                        case '2':
                                            let channelDelete = await logger_FunctionManager.createChannel(interaction, 'channelDelete', parent);
                                            logger_constructor.channelDelete_Id = channelDelete.id.toString();
                                            console.log('case 2 done')
                                        break;
                                        case '3':
                                            let guildBanAdd = await logger_FunctionManager.createChannel(interaction, 'guildBanAdd', parent);
                                            logger_constructor.guildBanAdd_Id = guildBanAdd.id.toString();
                                            console.log('case 3 done')
                                        break;
                                        case '4':
                                            let guildBanRemove = await logger_FunctionManager.createChannel(interaction, 'guildBanRemove', parent);
                                            logger_constructor.guildBanRemove_Id = guildBanRemove.id.toString();
                                            console.log('case 4 done')
                                        break;
                                        case '5':
                                            let guildRoleCreate = await logger_FunctionManager.createChannel(interaction, 'guildRoleCreate', parent);
                                            logger_constructor.guildRoleCreate_Id = guildRoleCreate.id.toString();
                                            console.log('case 5 done')
                                        break;
                                        case '6':
                                            let guildRoleDelete = await logger_FunctionManager.createChannel(interaction, 'guildRoleDelete', parent);
                                            logger_constructor.guildRoleDelete_Id = guildRoleDelete.id.toString();
                                            console.log('case 6 done')
                                        break;
                                        case '7':
                                            let guildRoleUpdate = await logger_FunctionManager.createChannel(interaction, 'guildRoleUpdate', parent);
                                            logger_constructor.guildRoleUpdate_Id = guildRoleUpdate.id.toString();
                                            console.log('case 7 done')
                                        break;
                                        case '8':
                                            let guildUpdate = await logger_FunctionManager.createChannel(interaction, 'guildUpdate', parent);
                                            logger_constructor.guildUpdate_Id = guildUpdate.id.toString();
                                            console.log('case 8 done')
                                        break;
                                        case '9':
                                            let messageDelete = await logger_FunctionManager.createChannel(interaction, 'messageDelete', parent);
                                            logger_constructor.messageDelete_Id = messageDelete.id.toString();
                                            console.log('case 9 done')
                                        break;
                                        case '10':
                                            let messageDeleteBulk = await logger_FunctionManager.createChannel(interaction, 'messageDeleteBulk', parent);
                                            logger_constructor.messageDeleteBulk_Id = messageDeleteBulk.id.toString();
                                            console.log('case 10 done')
                                        break;
                                        case '11':
                                            let messageUpdate = await logger_FunctionManager.createChannel(interaction, 'messageUpdate', parent);
                                            logger_constructor.messageUpdate_Id = messageUpdate.id.toString();
                                            console.log('case 11 done')
                                        break;
                                        case '12':
                                            let guildMemberAdd = await logger_FunctionManager.createChannel(interaction, 'guildMemberAdd', parent);
                                            logger_constructor.guildMemberAdd_Id = guildMemberAdd.id.toString();
                                            console.log('case 12 done')
                                        break;
                                        case '13':
                                            let guildMemberKick = await logger_FunctionManager.createChannel(interaction, 'guildMemberKick', parent);
                                            logger_constructor.guildMemberKick_Id = guildMemberKick.id.toString();
                                            console.log('case 13 done')
                                        break;
                                        case '14':
                                            let guildMemberRemove = await logger_FunctionManager.createChannel(interaction, 'guildMemberRemove', parent);
                                            logger_constructor.guildMemberRemove_Id = guildMemberRemove.id.toString();
                                            console.log('case 14 done')
                                        break;
                                        case '15':
                                            let guildMemberUpdate = await logger_FunctionManager.createChannel(interaction, 'guildMemberUpdate', parent);
                                            logger_constructor.guildMemberUpdate_Id = guildMemberUpdate.id.toString();
                                            console.log('case 15 done')
                                        break;
                                        case '16':
                                            let guildMemberNickUpdate = await logger_FunctionManager.createChannel(interaction, 'guildMemberNickUpdate', parent);
                                            logger_constructor.guildMemberNickUpdate_Id = guildMemberNickUpdate.id.toString();
                                            console.log('case 16 done')
                                        break;
                                        case '17':
                                            let voiceChannelLeave = await logger_FunctionManager.createChannel(interaction, 'voiceChannelLeave', parent);
                                            logger_constructor.voiceChannelLeave_Id = voiceChannelLeave.id.toString();
                                            console.log('case 17 done')
                                        break;
                                        case '18':
                                            let voiceChannelJoin = await logger_FunctionManager.createChannel(interaction, 'voiceChannelJoin', parent);
                                            logger_constructor.voiceChannelJoin_Id = voiceChannelJoin.id.toString();
                                            console.log('case 18 done')
                                        break;
                                        case '19':
                                            let voiceChannelUpdate = await logger_FunctionManager.createChannel(interaction, 'voiceChannelUpdate', parent);
                                            logger_constructor.voiceChannelUpdate_Id = voiceChannelUpdate.id.toString();
                                            console.log('case 19 done')
                                        break;
                                        case '20':
                                            let voiceChannelSwitch = await logger_FunctionManager.createChannel(interaction, 'voiceChannelSwitch', parent);
                                            logger_constructor.voiceChannelSwitch_Id = voiceChannelSwitch.id.toString();
                                            console.log('case 20 done')
                                        break;
                                        case '21':
                                            let guildEmojisUpdate = await logger_FunctionManager.createChannel(interaction, 'guildEmojisUpdate', parent);
                                            logger_constructor.guildEmojisUpdate_Id = guildEmojisUpdate.id.toString();
                                            console.log('case 21 done')
                                        break;

                                        default:
                                            return
                                        // 預設的程式碼
                                        break;
                                    }
                                }
                            })
                        
                        .then(async () =>{
                            await logger_DatabaseFunction.insert_Logger_Collection(
                                logger_constructor.Guild_Id,
                                logger_constructor.channelCreate_Id,
                                logger_constructor.channelDelete_Id,
                                logger_constructor.channelUpdate_Id,
                                logger_constructor.guildBanAdd_Id,
                                logger_constructor.guildBanRemove_Id,
                                logger_constructor.guildRoleCreate_Id,
                                logger_constructor.guildRoleDelete_Id,
                                logger_constructor.guildRoleUpdate_Id,
                                logger_constructor.guildUpdate_Id,
                                logger_constructor.messageDelete_Id,
                                logger_constructor.messageDeleteBulk_Id,
                                logger_constructor.messageUpdate_Id,
                                logger_constructor.guildMemberAdd_Id,
                                logger_constructor.guildMemberKick_Id,
                                logger_constructor.guildMemberRemove_Id,
                                logger_constructor.guildMemberUpdate_Id,
                                logger_constructor.guildMemberNickUpdate_Id,
                                logger_constructor.voiceChannelLeave_Id,
                                logger_constructor.voiceChannelJoin_Id,
                                logger_constructor.voiceChannelUpdate_Id,
                                logger_constructor.voiceChannelSwitch_Id,
                                logger_constructor.guildEmojisUpdate_Id,
                                logger_constructor.selectMenu_Values,
                                )
                                // await i.editReply({ content: `Logger Set Up Done !`, ephemeral: true });
                        })
                    } else {
                        // warn the user that the count status already exists
                        await i.editReply({ content: `You Set Up before , remove it or edit it`, ephemeral: true });
                    }
                } else {
                    // warn the user that at least one status must be selected
                    await i.update({ components: [selectMenu, button] });
                    await i.followUp({ content: `Please select [Logger] first !`, ephemeral: false })
                        .then((message) => {
                            setTimeout(() => {
                                message.delete();
                            }, 3000);
                        });
                }
            } else {
                // warn the user that the button is not for them
                i.editReply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        })
    }
