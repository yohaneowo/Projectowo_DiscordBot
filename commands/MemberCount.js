const { SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js');
const {components} = require('../commands_modules/count_status/component.js');
const {member_count_database_commands} = require('../commands_modules/count_status/database_commands.js')
const commands = new member_count_database_commands;
const {manage_channel_function} = require('../commands_modules/count_status/manage_channel_function.js');
const manage_channel_function = new manage_channel_function();

const fs = require('fs');
const { create_Category, create_All_Members_Count, create_Users_Count, create_Bots_Count, create_All_Online_Count, create_All_Online_Count_include_idle, create_User_Online_Count, create_User_Online_Count_include_idle,  create_User_Online_Count_include_idle_dnd, create_User_Idle_Count, create_User_Dnd_Count, create_User_Offline_Count} = manage_channel_function;
module.exports = {
    data : new SlashCommandBuilder()
        .setName('update_count')
        .setDescription('手动更新成员计数'),
    
    async execute(interaction, client, message) {
        // 确认 ID 并获取频道
        const guildId = interaction.guild.id;
        const All_Members_Count = interaction.guild.memberCount;
        const Users_Count = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const Bots_Count = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const msg = await interaction.reply({ content: 'Select [Status] to display', components: [components.Select_Menu, components.Button] });
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
            
            let menu_values = [];
            // collector event 收集用戶選擇的選項
            const Menu_collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });
            Menu_collector.on('collect',async i => {
                if (i.user.id === interaction.user.id) {
                    // await interaction.editReply({ content: `Selected ${i.values}`, components: [ Button] });
                    await i.deferUpdate();
                    console.log(i.values);
                    menu_values = i.values; 
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
                            // await i.reply({ content: `${menu_values}`, ephemeral: false });
                            commands.get_Guild_Ids().then(async Guild_Ids => {
                            if (!Guild_Ids.includes(guildId.toString())) {
                                    commands.update_Member_Count_Database(guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count)
                                    // await i.reply({ content: `Selected ${i.values}`, components: [Button] });
                                    const parent = await manage_channel_function.create_Category(interaction)
                                    for (let value of menu_values) {
                                        switch (value) {
                                            case '0':
                                            // 需要執行的程式碼
                                                const All_Members_Count = manage_channel_function.create_All_Members_Count(interaction, All_Members_Count, parent)
                                                console.log('case 0 done')
                                            break;
                                            case '1':
                                            // 需要執行的程式碼
                                                const Users_Count = manage_channel_function.create_Users_Count(interaction, Users_Count, parent)
                                                console.log('case 1 done')
                                            break;
                                            case '2':
                                            // 需要執行的程式碼
                                                const Bots_Count = manage_channel_function.create_Bots_Count(interaction, Bots_Count, parent)
                                                console.log('case 2 done')
                                            break;
                                            case '3':
                                            // 需要執行的程式碼
                                                const All_Online_Count = manage_channel_function.create_All_Online_Count(interaction, All_Online_Count, parent)
                                                console.log('case 3 done')
                                            break;
                                            case '4':
                                            // 需要執行的程式碼
                                                const All_Online_Count_include_idle = manage_channel_function.create_All_Online_Count_include_idle(interaction, All_Online_Count_include_idle, parent)
                                                console.log('case 4 done')
                                            break;
                                            case '5':
                                            // 需要執行的程式碼
                                                const All_Online_Count_include_idle_dnd = manage_channel_function.create_All_Online_Count_include_idle_dnd(interaction, All_Online_Count_include_idle_dnd, parent)
                                                console.log('case 5 done')
                                            break;
                                            case '6':
                                            // 需要執行的程式碼
                                                const All_Offline_Count = manage_channel_function.create_All_Offline_Count(interaction, All_Offline_Count, parent)
                                                console.log('case 6 done')
                                            break;
                                            case '7':
                                            // 需要執行的程式碼
                                                const User_Online_Count = manage_channel_function.create_User_Online_Count(interaction, User_Online_Count, parent)
                                                console.log('case 7 done')
                                            break;
                                            case '8':
                                            // 需要執行的程式碼
                                                const User_Online_Count_include_idle = manage_channel_function.create_User_Online_Count_include_idle(interaction, User_Online_Count_include_idle, parent)
                                                console.log('case 8 done')
                                            break;
                                            case '9':
                                            // 需要執行的程式碼
                                                const User_Online_Count_include_idle_dnd = manage_channel_function.create_User_Online_Count_include_idle_dnd(interaction, User_Online_Count_include_idle_dnd, parent)
                                                console.log('case 9 done')
                                            break;
                                            case '10':
                                            // 需要執行的程式碼
                                                const User_Idle_Count = manage_channel_function.create_User_Idle_Count(interaction, User_Idle_Count, parent)
                                                console.log('case 10 done')
                                            break;
                                            case '11':
                                            // 需要執行的程式碼
                                                const User_Dnd_Count = manage_channel_function.create_User_Dnd_Count(interaction, User_Dnd_Count, parent)
                                                console.log('case 11 done')
                                            break;
                                            case '12':
                                            // 需要執行的程式碼
                                                const User_Offline_Count = manage_channel_function.create_User_Offline_Count(interaction, User_Offline_Count, parent)
                                                console.log('case 12 done')
                                            break;
                                            default:
                                            // 預設的程式碼
                                            break;
                                        }
                                    }
                                } else {
                                    await i.reply({ content: `You Set Up before , remove it or edit it`, ephemeral: true });
                                }
                        })
                    } else {
                        await i.update({ components: [components.Select_Menu, components.Button] });
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