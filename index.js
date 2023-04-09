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


['EventsHandler', 'CommandsHandler','ErrorsHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Client);
});

const embed = new EmbedBuilder()
	.setTitle('Some Title')
	.setColor(0x00FFFF);


client.on("messageCreate", async (message) => {
	if (message.content.startsWith(PREFIX) && !message.author.bot) {
		// console.log(message.content)
		if (message.content.slice(PREFIX.length) === "ae") {
			// client.commands.get("ae").execute(message, message.content);
			message.channel.createWebhook({
				name: 'Some-username',
				avatar: 'https://i.imgur.com/AfFp7pu.png',
			})
				.then(webhook => console.log(`Created webhook ${webhook}`))
				.catch(console.error);
			const webhooks = await message.channel.fetchWebhooks();
			const webhook = webhooks.find(wh => wh.token);
			try {
				await webhook.send({
					content: 'Webhook test',
					username: '夜羽',
					avatarURL: 'https://cdn.discordapp.com/avatars/559762654084857876/e49636c0db11b2b37b0213a60b4513a2.webp?size=32',
					embeds: [embed],
				});
			} catch (err) {
				console.log(err)
			}
			
		 
		}

	}

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

