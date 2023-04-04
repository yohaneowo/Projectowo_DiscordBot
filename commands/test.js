const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");
const components = require('../commands_modules/count_status/component.js')
const { Button, Select_Menu } = components;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
    
        
		msg = await interaction.reply({ content: 'Select [Status] to display', components: [Select_Menu, Button] });
		let menu_collected = false;
		
		// collector event1 收集用戶選擇的選項
        const Menu_collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 15000 });
        Menu_collector.on('collect',async i => {
            if (i.user.id === interaction.user.id) {
				const labels = Get_Chosen_label(i.values).join(', ');
				await i.reply({ content: `Selected ${labels}`, components: [Button] });
				menu_collected = true;
            } else {
                i.reply({ content: `These Selection aren't for you!`, ephemeral: true });
            }
        });
            Menu_collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });


		const Button_collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
		Button_collector.on('collect',async i => {
			if (i.user.id === interaction.user.id) {
				if (menu_collected) {
					await i.reply({ content: `GO`, ephemeral: false });
				} else {
					await i.update({ components: [Select_Menu, Button] });
					await i.followUp({ content: `Please select [Status] first !`, ephemeral: false })
						.then((message) => {
							setTimeout(() => {
								message.delete();
							}, 3000);
						});
				}
			} else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		})



		// 獲取用戶選擇的選項的名字
       function Get_Chosen_label(index) {
			Selected_Labels = [];
			for (n in index) {
				Selected_Labels.push(Select_Menu.components[0].options[parseInt(n)].data.label);
			}
			return Selected_Labels;
		}

    },
}