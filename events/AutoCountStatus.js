const {MemberCount_DatabaseFunctions} = require(`${process.cwd()}/commands_modules/count_status/cs_databaseFunctionManager.js`);
async function AutoCountStatus(client) {
    const CountStatus_DatabaseManager = new MemberCount_DatabaseFunctions();
    CountStatus_DatabaseManager.get_Guild_Ids_MemberCount_ChannelId().then(async(Guild_Ids) => {
        console.log(Guild_Ids)
        for (let Guild_id of Guild_Ids) {
            const [ Channel_Ids, Select_Values_Object ]  = await Promise.all([
                CountStatus_DatabaseManager.get_MemberCount_ChannelId(Guild_id),
                CountStatus_DatabaseManager.get_MemberCount_SelectValue(Guild_id)
            ]);
            const current_guild = await client.guilds.cache.get(Guild_id);
            const All_Members_Count = await current_guild.members.cache.filter(member => member.presence?.status === 'online').size;
            if (All_Members_Count) {
                if (Select_Values_Object) {
                    console.log(`this is select value${Select_Values_Object}`)
                        if (Channel_Ids) {
                            const Select_Values_Array = Select_Values_Object.toString().split(",");
                                Select_Values_Array.forEach(async value => {
                                    console.log(`test test${value[0]}`)
                                    switch (value) {
                                        case "3":
                                            const All_Online_Count_Channel_Id = await current_guild.channels.fetch(Channel_Ids[0].All_Online_Count_Id)
                                            current_guild.channels.edit(`${All_Online_Count_Channel_Id.id}`, {name: `All Members: ${All_Members_Count}`})
                                            const date = new Date();
                                            console.log(`All Members: ${All_Members_Count}, ${date}`);
                                            break;
                                    }
                                });
        
                            // 
                        }
                    } 
                }
            
        }
    })
}

setInterval(() => {AutoCountStatus(client);}, 1000 * 60 * 5);