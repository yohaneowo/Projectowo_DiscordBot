const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder ()
        .setName('test')
        .setDescription("test command"),

    execute(interaction,client, message) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
        interaction.reply({ content: 'I think you should,', components: [row]})
    },
};