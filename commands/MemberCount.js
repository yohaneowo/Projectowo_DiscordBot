const { SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js');
const {MemberCount_DatabaseFunctions} = require('../commands_modules/count_status/databaseFunctionManager.js')
const {MemberCount_ManageFunctions} = require('../commands_modules/count_status/channelFunctionManager.js');
const {MemberCount_Interaction_Components, ServerStatusIds} = require('../commands_modules/count_status/component.js');
const databaseFunctionManager = new MemberCount_DatabaseFunctions;
const channelFunctionManager = new MemberCount_ManageFunctions();   


module.exports = {
    data : new SlashCommandBuilder()
        .setName('update_count')
        .setDescription('手动更新成员计数'),
    
    async execute(interaction, client, message) {
        // Get count via discord api without fetch()
        const guild_Id = interaction.guild.id;
        const user_Id = interaction.user.id;
        const allMembers_Count = interaction.guild.memberCount;
        const usersCount = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const bots_Count = interaction.guild.members.cache.filter(member => member.user.bot).size;
        // define components for interaction
        const selectMenu = new MemberCount_Interaction_Components().Select_Menu;
        const button = new MemberCount_Interaction_Components().Button;
        // Send message to user with Components
        const msg = await interaction.reply({ content: 'Select [Status] to display', components: [selectMenu, button] });
        // To check if select menu is selected or not
		let isMenuSelect = false;
        // Get count via discord api with fetch()
        interaction.guild.members.fetch({ withPresences: true })
        .then(async fetchedMembers => {
            const allOnline_Count = fetchedMembers.filter(member => member.presence?.status === 'online').size;
            const allOnline_Count_Idle_included = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size;
            const allOnline_Count_Idle_Dnd_included = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size
            const allOffline_Count = fetchedMembers.filter(member => !member.presence?.status).size;
            const userOnline_Count = fetchedMembers.filter(member => member.presence?.status === 'online' &&  member.user.bot == false).size;
            const userOnline_Count_Idle_included = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const userOnline_Count_Idle_Dnd_included = fetchedMembers.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const userIdle_Count = fetchedMembers.filter(member => member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const userDnd_Count = fetchedMembers.filter(member => member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const userOffline_Count = fetchedMembers.filter(member => !member.presence?.status &&  member.user.bot == false).size;
            let selectMenu_Values = [];

            // Collector Event for Select Menu
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
                    await i.deferUpdate();
                    // Check Menu is selected or not , if not then send error message
                    if (isMenuSelect) {
                        // Get all the ids of the guilds in database
                        databaseFunctionManager.get_Guild_Ids().then(async Guild_Ids => {
                            // Check if the guild is already in database or not
                            if (!Guild_Ids.includes(guild_Id.toString())) {
                                // Storing all promises in an array
                                promises = [];
                                // create a constructor to store ids temporarily
                                const serverStatusIds_Constructor = new ServerStatusIds();
                                    // Storing all the count in database
                                    database_commands.update_Member_Count_Database(guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Online_Count_include_idle, All_Online_Count_include_idle_dnd, All_Offline_Count, User_Online_Count, User_Online_Count_include_idle, User_Online_Count_include_idle_dnd, User_Idle_Count, User_Dnd_Count, User_Offline_Count);
                                    await new Promise(async (resolve, reject) => {
                                        const parent = await channelFunctionManager.createChannel(interaction, 'Category', null, null);
                                        serverStatusIds_Constructor.Category_Id = parent.id;
                                        serverStatusIds_Constructor.Guild_Id = guild_Id;
                                        serverStatusIds_Constructor.User_Id = user_Id;
                                        serverStatusIds_Constructor.dateTime = new Date();
                                        serverStatusIds_Constructor.Menu_Select_Values = selectMenu_Values.toString();
                                        resolve(parent);
                                        }).then(async (parent) => {
                                                // Loops through all the values of select menu
                                                for (let value of selectMenu_Values) {
                                                    switch (value) {
                                                        case '0':
                                                            // Create a channel and store the id in constructor
                                                            let allMembers_Count_Channel = await channelFunctionManager.createChannel(interaction, 'All_Members_Count', parent, allMembers_Count);
                                                            serverStatusIds_Constructor.All_Members_Count_Id = allMembers_Count_Channel.id.toString()
                                                            console.log('case 0 done')
                                                        break;
                                                        case '1':
                                                            let users_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Count', parent, usersCount);
                                                            serverStatusIds_Constructor.Users_Count_Id = users_Count_Channel.id.toString()
                                                            console.log('case 1 done')
                                                        break;
                                                        case '2':
                                                            let bots_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Bots_Count', parent, bots_Count);
                                                            serverStatusIds_Constructor.Bots_Count_Id = bots_Count_Channel.id.toString()
                                                            console.log('case 2 done')
                                                        break;
                                                        case '3':
                                                            let allOnline_Count_Channel = await channelFunctionManager.createChannel(interaction, 'All_Online_Count', parent, allOnline_Count)
                                                            serverStatusIds_Constructor.All_Online_Count_Id = allOnline_Count_Channel.id.toString()
                                                            console.log('case 3 done')
                                                        break;
                                                        case '4':
                                                            let allOnline_Count_Idle_included_Channel = await channelFunctionManager.createChannel(interaction, 'All_Online_Count_include_idle', parent, allOnline_Count_Idle_included)
                                                            serverStatusIds_Constructor.All_Online_Count_include_idle_Id = allOnline_Count_Idle_included_Channel.id.toString()
                                                            console.log('case 4 done') 
                                                        break;
                                                        case '5':
                                                            let allOnline_Count_Idle_Dnd_included_Channel = await channelFunctionManager.createChannel(interaction, 'All_Online_Count_include_idle_dnd', parent, allOnline_Count_Idle_Dnd_included)
                                                            serverStatusIds_Constructor.All_Online_Count_include_idle_dnd_Id = allOnline_Count_Idle_Dnd_included_Channel.id.toString()
                                                            console.log('case 5 done')
                                                        break;
                                                        case '6':
                                                            let allOffline_Count_Channel = await channelFunctionManager.createChannel(interaction, 'All_Offline_Count', parent, allOffline_Count)
                                                            serverStatusIds_Constructor.All_Offline_Count_Id = allOffline_Count_Channel.id.toString()
                                                            console.log('case 6 done')
                                                        break;
                                                        case '7':
                                                            let userOnline_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Online_Count', parent, userOnline_Count)
                                                            serverStatusIds_Constructor.User_Online_Count_Id = userOnline_Count_Channel.id.toString()
                                                            console.log('case 7 done')
                                                        break;
                                                        case '8':
                                                            let userOnline_Count_Idle_included_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Online_Count_include_idle', parent, userOnline_Count_Idle_included)
                                                            serverStatusIds_Constructor.User_Online_Count_include_idle_Id = userOnline_Count_Idle_included_Channel.id.toString()   
                                                            console.log('case 8 done')
                                                        break;
                                                        case '9':
                                                            let userOnline_Count_Idle_Dnd_included_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Online_Count_include_idle_dnd', parent, userOnline_Count_Idle_Dnd_included)
                                                            serverStatusIds_Constructor.User_Online_Count_include_idle_dnd_Id = userOnline_Count_Idle_Dnd_included_Channel.id.toString()
                                                            console.log('case 9 done')
                                                        break;
                                                        case '10':
                                                            let userIdle_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Idle_Count', parent, userIdle_Count)
                                                            serverStatusIds_Constructor.User_Idle_Count_Id = userIdle_Count_Channel.id.toString()
                                                            console.log('case 10 done')
                                                        break;
                                                        case '11':
                                                            let userDnd_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Dnd_Count', parent, userDnd_Count)
                                                            serverStatusIds_Constructor.User_Dnd_Count_Id = userDnd_Count_Channel.id.toString()
                                                            console.log('case 11 done')
                                                        break;
                                                        case '12':
                                                            let userOffline_Count_Channel = await channelFunctionManager.createChannel(interaction, 'Users_Offline_Count', parent, userOffline_Count)
                                                            serverStatusIds_Constructor.User_Offline_Count_Id = userOffline_Count_Channel.id.toString()
                                                            console.log('case 12 done')
                                                        break;
                                                        default:
                                                            reject(new Error("无效的值"));
                                                        // 預設的程式碼
                                                        break;
                                                        }
                                                }
                                        })
                                        // Insert the id's into the database from the constructor
                                        .then(() => {
                                            databaseFunctionManager.insert_MemberCount_ChannelId(
                                            serverStatusIds_Constructor.Guild_Id,
                                            serverStatusIds_Constructor.Category_Id,
                                            serverStatusIds_Constructor.All_Members_Count_Id,
                                            serverStatusIds_Constructor.Users_Count_Id,
                                            serverStatusIds_Constructor.Bots_Count_Id,
                                            serverStatusIds_Constructor.All_Online_Count_Id,
                                            serverStatusIds_Constructor.All_Online_Count_include_idle_Id,
                                            serverStatusIds_Constructor.All_Online_Count_include_idle_dnd_Id,
                                            serverStatusIds_Constructor.All_Offline_Count_Id,
                                            serverStatusIds_Constructor.User_Online_Count_Id,
                                            serverStatusIds_Constructor.User_Online_Count_include_idle_Id,
                                            serverStatusIds_Constructor.User_Online_Count_include_idle_dnd_Id,
                                            serverStatusIds_Constructor.User_Idle_Count_Id,
                                            serverStatusIds_Constructor.User_Dnd_Count_Id,
                                            serverStatusIds_Constructor.User_Offline_Count_Id,
                                            serverStatusIds_Constructor.User_Id,
                                            serverStatusIds_Constructor.dateTime,
                                            serverStatusIds_Constructor.selectMenu_Values.toString()
                                            )
                                        })
                            } else {
                                // warn the user that the count status already exists
                                await i.reply({ content: `You Set Up= before , remove it or edit it`, ephemeral: true });
                            }
                        });
                    } else {
                        // warn the user that at least one status must be selected
                        await i.update({ components: [selectMenu, button] });
                        await i.followUp({ content: `Please select [Status] first !`, ephemeral: false })
                            .then((message) => {
                                setTimeout(() => {
                                    message.delete();
                                }, 3000);
                            });
                    }
                } else {
                    // warn the user that the button is not for them
                    i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
                }
            })
    })
    .catch(console.error);

        
   
    }
}