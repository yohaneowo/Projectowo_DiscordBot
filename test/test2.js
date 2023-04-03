const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('discord.js');
const { ComponentType } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder ()
        .setName('test')
        .setDescription("test command"),

    async execute(interaction,client, message) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
        const msg = await interaction.reply({ content: 'I think you should,', components: [row], ephemeral: true})
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

        collector.on('collect', i => {
            if (i.user.id === interaction.user.id) {
                i.reply(`${i.user.tag} clicked on the ${i.customId} button.`);
            } else {
                i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });
            collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};