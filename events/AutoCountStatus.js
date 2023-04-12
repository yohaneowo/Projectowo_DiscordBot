const {MemberCount_DatabaseFunctions} = require(`${process.cwd()}/commands_modules/count_status/cs_databaseFunctionManager.js`);
async function AutoCountStatus(client) {
    console.time('AutoCountStatus');
    const CountStatus_DatabaseManager = new MemberCount_DatabaseFunctions();
    CountStatus_DatabaseManager.get_Guild_Ids_MemberCount_ChannelId().then(async(Guild_Ids) => {
        // console.log(Guild_Ids)
        Guild_Ids.forEach(async(Guild_id) => {
            const [ Channel_Ids, Select_Values_Object ]  = await Promise.all([
                CountStatus_DatabaseManager.get_MemberCount_ChannelId(Guild_id),
                CountStatus_DatabaseManager.get_MemberCount_SelectValue(Guild_id)
            ]);
            const current_guild = await client.guilds.cache.get(Guild_id);
            const allMembers_Count = current_guild.members.cache.filter(member => member).size;
            const usersCount = current_guild.members.cache.filter(member => !member.user.bot).size;
            const bots_Count = current_guild.members.cache.filter(member => member.user.bot).size;
            const allOnline_Count = await current_guild.members.cache.filter(member => member.presence?.status === 'online').size;
            const allOnline_Count_Idle_included = await current_guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size;
            const allOnline_Count_Idle_Dnd_included = await current_guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle').size
            const allOffline_Count = await current_guild.members.cache.filter(member => !member.presence?.status).size;
            const userOnline_Count = await current_guild.members.cache.filter(member => member.presence?.status === 'online' &&  member.user.bot == false).size;
            const userOnline_Count_Idle_included = await current_guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const userOnline_Count_Idle_Dnd_included = await current_guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const userIdle_Count = await current_guild.members.cache.filter(member => member.presence?.status === 'idle' &&  member.user.bot == false).size;
            const userDnd_Count = await current_guild.members.cache.filter(member => member.presence?.status === 'dnd' &&  member.user.bot == false).size;
            const userOffline_Count = await current_guild.members.cache.filter(member => !member.presence?.status &&  member.user.bot == false).size;
            // console.log(`this is select value${Select_Values_Object}`)
            const Select_Values_Array = Select_Values_Object.toString().split(",");-
                Select_Values_Array.forEach(async value => {
                    switch (value) {
                        case '0':
                            const allMembers_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].All_Members_Count_Id)
                            current_guild.channels.edit(`${allMembers_Count_Channel.id}`, {name: `All_Members_Count: ${allMembers_Count}`})
                            break;
                        case "1":
                            const usersCount_Channel = await current_guild.channels.fetch(Channel_Ids[0].Users_Count_Id)
                            current_guild.channels.edit(`${usersCount_Channel.id}`, {name: `Users_Count: ${usersCount}`})
                            break;
                        case "2":
                            const bots_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].Bots_Count_Id)
                            current_guild.channels.edit(`${bots_Count_Channel.id}`, {name: `Bots_Count: ${bots_Count}`})
                            break;
                        case "3":
                            const allOnline_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].All_Online_Count_Id)
                            current_guild.channels.edit(`${allOnline_Count_Channel.id}`, {name: `All Members: ${allOnline_Count}`})
                            break;
                        case "4":
                            const allOnline_Count_Idle_included_Channel = await current_guild.channels.fetch(Channel_Ids[0].All_Online_Count_include_idle_Id)
                            current_guild.channels.edit(`${allOnline_Count_Idle_included_Channel.id}`, {name: `All_Online_Count_Idle_included: ${allOnline_Count_Idle_included}`})
                            break;
                        case "5":
                            const allOnline_Count_Idle_Dnd_included_Channel = await current_guild.channels.fetch(Channel_Ids[0].All_Online_Count_include_idle_dnd_Id)
                            current_guild.channels.edit(`${allOnline_Count_Idle_Dnd_included_Channel.id}`, {name: `All_Online_Count_Idle_Dnd_included: ${allOnline_Count_Idle_Dnd_included}`})
                            break;
                        case "6":
                            const allOffline_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].All_Offline_Count_Id)
                            current_guild.channels.edit(`${allOffline_Count_Channel.id}`, {name: `All_Offline_Count: ${allOffline_Count}`})
                            break;
                        case "7":
                            const userOnline_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Online_Count_Id)
                            current_guild.channels.edit(`${userOnline_Count_Channel.id}`, {name: `User_Online_Count: ${userOnline_Count}`})
                            break;
                        case "8":
                            const userOnline_Count_Idle_included_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Online_Count_include_idle_Id)
                            current_guild.channels.edit(`${userOnline_Count_Idle_included_Channel.id}`, {name: `User_Online_Count_Idle_included: ${userOnline_Count_Idle_included}`})
                            break;
                        case "9":
                            const userOnline_Count_Idle_Dnd_included_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Online_Count_include_idle_dnd_Id)
                            current_guild.channels.edit(`${userOnline_Count_Idle_Dnd_included_Channel.id}`, {name: `User_Online_Count_Idle_Dnd_included: ${userOnline_Count_Idle_Dnd_included}`})
                            break;
                        case "10":
                            const userIdle_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Idle_Count_Id)
                            current_guild.channels.edit(`${userIdle_Count_Channel.id}`, {name: `User_Idle_Count: ${userIdle_Count}`})
                            break;
                        case "11":
                            const userDnd_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Dnd_Count_Id)
                            current_guild.channels.edit(`${userDnd_Count_Channel.id}`, {name: `User_Dnd_Count: ${userDnd_Count}`})
                            break;
                        case "12":
                            const userOffline_Count_Channel = await current_guild.channels.fetch(Channel_Ids[0].User_Offline_Count_Id)
                            current_guild.channels.edit(`${userOffline_Count_Channel.id}`, {name: `User_Offline_Count: ${userOffline_Count}`})
                            break;
                        default:
                            break;
                    }
                });
                // const time = new Date();
                // console.log(`[${time},
                // All_Members_Count: ${allMembers_Count},
                // Users_Count: ${usersCount},
                // Bots_Count: ${bots_Count},
                // All_Online_Count: ${allOnline_Count},
                // All_Online_Count_Idle_included: ${allOnline_Count_Idle_included},
                // All_Online_Count_Idle_Dnd_included: ${allOnline_Count_Idle_Dnd_included},
                // All_Offline_Count: ${allOffline_Count},
                // User_Online_Count: ${userOnline_Count},
                // User_Online_Count_Idle_included: ${userOnline_Count_Idle_included},
                // User_Online_Count_Idle_Dnd_included: ${userOnline_Count_Idle_Dnd_included},
                // User_Idle_Count: ${userIdle_Count},
                // User_Dnd_Count: ${userDnd_Count},
                // User_Offline_Count: ${userOffline_Count}]`)
                
            // 
            
        })
    })
     console.timeEnd('AutoCountStatus');
}

setInterval(() => {AutoCountStatus(client);}, 1000 * 60 * 5 );