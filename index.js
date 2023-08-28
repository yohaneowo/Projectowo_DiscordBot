// Require the necessary discord.js classes
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, WebhookClient, EmbedBuilder } = require('discord.js');
// Create a new client instance
const { PREFIX } = require('./config.json')
const client = new Client({ intents: [3276799, GatewayIntentBits.GuildPresences, 	 8] });
module.exports = client;
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

;["EventsHandler", "CommandsHandler", "ErrorsHandler", "Function"].forEach(
  (handler) => {
    require(`./handlers/${handler}`)(client, Client)
  }
)
figlet("Project uwu ", function (err, data) {
  if (err) {
    console.log("Something went wrong...")
    console.dir(err)
    return
  }
  console.log(data)

})


// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = interaction.client.commands.get(interaction.commandName);
// 	const message = client.message
// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}

// 	try {
// 		await command.execute(interaction,client, message);
// 	} catch (err) {
// 		console.error(err);
// 		// if (interaction.replied || interaction.deferred) {
// 			// } else {
// 			// 	await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 			// 	await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 		// }
// 	}
// });
    // if (interaction.commandName === 'ping') {
	// 	const row = new ActionRowBuilder()
	// 		.addComponents(
	// 			new ButtonBuilder()
	// 				.setCustomId('primary')
	// 				.setStyle(ButtonStyle.Primary)
    //                 .setEmoji('<a:642384136585347092:854955865336578068>'),
	// 		);

	// 	await interaction.reply({ content: 'I think you should,', components: [row] });
	// }
    

// Log in to Discord with your client's token
console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);

