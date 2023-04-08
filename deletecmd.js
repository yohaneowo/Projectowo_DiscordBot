const { MemberCount_ManageFunctions } =  require('./commands_modules/count_status/channelFunctionManager.js');
const errorEmbed = new MemberCount_ManageFunctions();
const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { clientId, guildId, token } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch( async(err) => {
        console.error(err)
            try {
                await errorEmbed.sendChannelError(null, err)
            } catch (err) {
                console.error(err)
            }
        }
    );

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(async (err) => {
        console.error(err)

        try {
            await errorEmbed.sendChannelError(null, err)
        } catch (err) {
            console.error(err)
        }
    });