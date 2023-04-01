const client = require('../index.js')
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	const message = client.message
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction, client, message);
	} catch (err) {
		console.error(err);
		if (interaction.replied || interaction.deferred) {
			} else {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	        }	
	}
    
}}