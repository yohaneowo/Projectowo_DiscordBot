const { SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js');
const {member_count_database_commands} = require('../commands_modules/count_status/database_commands.js')
const database_commands = new member_count_database_commands;
const {member_count_manage_channel_function} = require('../commands_modules/count_status/manage_channel_function.js');
const manage_channel_function = new member_count_manage_channel_function();
const {member_count_components, member_count_channels_id_constructor} = require('../commands_modules/count_status/component.js');
const Select_Menu_Component = new member_count_components().Select_Menu;
const Button_Component = new member_count_components().Button;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update_count')
        .setDescription('手动更新成员计数'),
    
    async execute(interaction, client, message) {
        // 确认 ID 并获取频道
        const guildId = interaction.guild.id;
        const User_Id = interaction.user.id;
        const All_Members_Count = interaction.guild.memberCount;
        const Users_Count = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const Bots_Count = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const msg = await interaction.reply({ content: 'Select [Status] to display', components: [Select_Menu_Component, Button_Component] });
		let menu_collected = false;

        interaction.guild.members.fetch({ withPresences: true })
        .then(async fetchedMembers => {
            const All_Online_Count = fetchedMembers.filter(member => member.presence?.status === 'online').size;
            const All_Online_Count_include_idle = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size;
            const All_Online_Count_include_idle_dnd = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size
            const All_Offline_Count = fetchedMembers.filter(member => !member.presence?.status).size;
            const User_Online_Count = fetchedMembers.filter(member => member.presence?.status === 'online' &&  member.user.bot == false).size;
            const User_Online_Count_include_idle = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const User_Online_Count_include_idle_dnd = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const User_Idle_Count = fetchedMembers.filter(member => member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const User_Dnd_Count = fetchedMembers.filter(member => member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const User_Offline_Count = fetchedMembers.filter(member => !member.presence?.status &&  member.user.bot == false).size;
            
            let Menu_Select_Values = [];
            // collector event 收集用戶選擇的選項
            const Menu_collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });
            Menu_collector.on('collect',async i => {
                if (i.user.id === interaction.user.id) {
                    // await interaction.editReply({ content: `Selected ${i.values}`, components: [ Button] });
                    await i.deferUpdate();
                    // console.log(i.values);
                    Menu_Select_Values = i.values; 
                    menu_collected = true;
                } else {
                    i.reply({ content: `These Selection aren't for you!`, ephemeral: true });
                }
            });
                Menu_collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });


                const Button_collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });
                Button_collector.on('collect',async i => {
                    if (i.user.id === interaction.user.id) {
                        if (menu_collected) {
                            database_commands.get_Guild_Ids().then(async Guild_Ids => {
                                if (!Guild_Ids.includes(guildId.toString())) {
                                    promises = [];
                                    const channels_id_constructor = new member_count_channels_id_constructor();
                                    // database_commands.update_Member_Count_Database(guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count);
                                        new Promise((resolve, reject) => {
                                            const parent =  manage_channel_function.create_Category(interaction)
                                            channels_id_constructor.constructor.Category_Id = parent.id;
                                            channels_id_constructor.constructor.Guild_Id = guildId;
                                            channels_id_constructor.constructor.User_Id = User_Id;
                                            channels_id_constructor.constructor.datetime = new Date();
                                            channels_id_constructor.constructor.Menu_Select_Values = Menu_Select_Values;
                                            console.log("🚀 ~ file: MemberCount.js:74 ~ newPromise ~ Menu_Select_Values:", Menu_Select_Values)
                                            resolve(parent);
                                        }).then((parent) => {
                                                for (let value of Menu_Select_Values) {
                                                    switch (value) {
                                                        case '0':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                manage_channel_function.create_All_Members_Count(interaction, All_Members_Count, parent);
                                                                }).then((All_Members_Count) => {
                                                                    console.log(All_Members_Count.id.toString())
                                                                    channels_id_constructor.constructor.All_Members_Count_Id = All_Members_Count.id.toString()
                                                                    console.log(channels_id_constructor.constructor.All_Members_Count_Id)
                                                                    resolve();
                                                                    console.log('case 0 done')
                                                            }))
                                                        break;
                                                        case '1':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                manage_channel_function.create_Users_Count(interaction, Users_Count, parent);
                                                                }).then((Users_Count) => {
                                                                    channels_id_constructor.constructor.Users_Count_Id = Users_Count.id.toString()
                                                                    resolve();
                                                                    console.log('case 1 done')
                                                                })
                                                            )
                                                        break;
                                                        case '2':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                manage_channel_function.create_Bots_Count(interaction, Bots_Count, parent)
                                                                }).then((Bots_Count) => { 
                                                                    channels_id_constructor.constructor.Bots_Count_Id = Bots_Count.id.toString()
                                                                    resolve();
                                                                    console.log('case 2 done')
                                                                })
                                                            )
                                           
                                                        break;
                                                        case '3':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_All_Online_Count(interaction, All_Online_Count, parent)
                                                                }).then((All_Online_Count) => {
                                                                    channels_id_constructor.constructor.All_Online_Count_Id = All_Online_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 3 done')
                                                            }))
                                                        break;
                                                        case '4':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_All_Online_Count_include_idle(interaction, All_Online_Count_include_idle, parent)
                                                                }).then((All_Online_Count_include_idle) => {
                                                                    channels_id_constructor.constructor.All_Online_Count_include_idle_Id = All_Online_Count_include_idle.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 4 done')
                                                            }))
                                                        break;
                                                        case '5':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_All_Online_Count_include_idle_dnd(interaction, All_Online_Count_include_idle_dnd, parent)
                                                                }).then((All_Online_Count_include_idle_dnd) => {
                                                                    channels_id_constructor.constructor.All_Online_Count_include_idle_dnd_Id = All_Online_Count_include_idle_dnd.id.toString()
                                                                })
                                                                console.log('case 5 done')
                                                            }))
                                                        break;
                                                        case '6':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_All_Offline_Count(interaction, All_Offline_Count, parent)
                                                                }).then((All_Offline_Count) => {
                                                                    channels_id_constructor.constructor.All_Offline_Count_Id = All_Offline_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 6 done')
                                                            }))
                                                        break;
                                                        case '7':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_User_Online_Count(interaction, User_Online_Count, parent)
                                                                }).then((User_Online_Count) => {
                                                                    channels_id_constructor.constructor.User_Online_Count_Id = User_Online_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 7 done')
                                                            }))
                                                        break;
                                                        case '8':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_User_Online_Count_include_idle(interaction, User_Online_Count_include_idle, parent)
                                                                }).then((User_Online_Count_include_idle) => {
                                                                    channels_id_constructor.constructor.User_Online_Count_include_idle_Id = User_Online_Count_include_idle.id.toString()   
                                                                })
                                                                resolve();
                                                                console.log('case 8 done')
                                                            }))
                                                        break;
                                                        case '9':
                                                        // 需要執行的程式碼\
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_User_Online_Count_include_idle_dnd(interaction, User_Online_Count_include_idle_dnd, parent)
                                                                }).then((User_Online_Count_include_idle_dnd) => {
                                                                    channels_id_constructor.constructor.User_Online_Count_include_idle_dnd_Id = User_Online_Count_include_idle_dnd.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 9 done')
                                                            }))
                                                        break;
                                                        case '10':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_User_Idle_Count(interaction, User_Idle_Count, parent)
                                                                }).then((User_Idle_Count) => {
                                                                    channels_id_constructor.constructor.User_Idle_Count_Id = User_Idle_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 10 done')
                                                            }))
                                                        break;
                                                        case '11':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {
                                                                manage_channel_function.create_User_Dnd_Count(interaction, User_Dnd_Count, parent)
                                                                }).then((User_Dnd_Count) => {
                                                                    channels_id_constructor.constructor.User_Dnd_Count_Id = User_Dnd_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 11 done')
                                                            }))
                                                        break;
                                                        case '12':
                                                        // 需要執行的程式碼
                                                            promises.push(new Promise((resolve, reject) => {
                                                                new Promise((resolve, reject) => {      
                                                                manage_channel_function.create_User_Offline_Count(interaction, User_Offline_Count, parent)
                                                                }).then((User_Offline_Count) => {
                                                                    channels_id_constructor.constructor.User_Offline_Count_Id = User_Offline_Count.id.toString()
                                                                })
                                                                resolve();
                                                                console.log('case 12 done')
                                                            }))
                                                        break;
                                                        default:
                                                            reject(new Error("无效的值"));
                                                        // 預設的程式碼
                                                        break;
                                                        }
                                                    }
                                            })
                                             Promise.all(promises).then(() => {
                                                setTimeout(() => {

                                                console.log(`WTF${channels_id_constructor.constructor.All_Members_Count_Id}`)
                                                  }, 10000); // 1 秒延遲
                                                console.log("🚀 ~ file: MemberCount.js:265 ~ Promise.all ~ channels_id_constructor.constructor.Users_Count_Id:", channels_id_constructor.constructor.Users_Count_Id)
                                                console.log("🚀 ~ file: MemberCount.js:267 ~ Promise.all ~  channels_id_constructor.constructor.Bots_Count_Id:",  channels_id_constructor.constructor.Bots_Count_Id)
                                                // database_commands.insert_Server_Status_Collection(
                                                // channels_id_constructor.constructor.Guild_Id,
                                                // channels_id_constructor.constructor.Category_Id,
                                                // channels_id_constructor.constructor.All_Members_Count_Id,
                                                // channels_id_constructor.constructor.Users_Count_Id,
                                                // channels_id_constructor.constructor.Bots_Count_Id,
                                                // channels_id_constructor.constructor.All_Online_Count_Id,
                                                // channels_id_constructor.constructor.All_Online_Count_include_idle_Id,
                                                // channels_id_constructor.constructor.All_Online_Count_include_idle_dnd_Id,
                                                // channels_id_constructor.constructor.All_Offline_Count_Id,
                                                // channels_id_constructor.constructor.User_Online_Count_Id,
                                                // channels_id_constructor.constructor.User_Online_Count_include_idle_Id,
                                                // channels_id_constructor.constructor.User_Online_Count_include_idle_dnd_Id,
                                                // channels_id_constructor.constructor.User_Idle_Count_Id,
                                                // channels_id_constructor.constructor.User_Dnd_Count_Id,
                                                // channels_id_constructor.constructor.User_Offline_Count_Id,
                                                // channels_id_constructor.constructor.User_Id,
                                                // channels_id_constructor.constructor.datetime,
                                                // channels_id_constructor.constructor.Menu_Select_Values
                                                // )
                                            })
                                            // Promise.all(promises).then(() => {
                                            //     console.log(`All members count ID: ${channels_id_constructor.constructor.All_Members_Count_Id}`);
                                            //     // 在这里使用 channels_id_constructor.constructor.All_Members_Count_Id 的值
                                            // });     
                                    
                                               
                                   
                                } else {
                                    await i.reply({ content: `You Set Up= before , remove it or edit it`, ephemeral: true });
                                }
                            });
                        } else {
                            await i.update({ components: [Select_Menu_Component, Button_Component] });
                            await i.followUp({ content: `Please select [Status] first !`, ephemeral: false })
                                .then((message) => {
                                    setTimeout(() => {
                                        message.delete();
                                    }, 3000);
                                });
                        }
                    } else {
                        i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
                    }
                })
        })
        .catch(console.error);

        
   
    }
}