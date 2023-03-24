// Require the necessary discord.js classes
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// Create a new client instance
const client = new Client({ intents:8  });
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

['eventsHandler', 'commandsHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Client);
});
     
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

    if (interaction.commandName === 'ping') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setStyle(ButtonStyle.Primary)
                    .setEmoji('<a:642384136585347092:854955865336578068>'),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });
	}
    
});
// Log in to Discord with your client's token
console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);

