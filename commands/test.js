const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        const Button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Select Done !')
					.setStyle(ButtonStyle.Primary),
			);
        const Select_Menu = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(9)
					.addOptions([
						{
							label: 'All_Members_Count',
							description: 'Add All_Members_Count to category channel',
							value: 'a',
						},
						{
							label: 'Users_Count',
							description: 'Add Users_Count to category channel',
							value: 'b',
						},
						{
							label: 'Bots_Count',
							description: 'Add Bots_Count to category channel',
							value: 'c',
						},
                        {
							label: 'All_Online_Count',
							description: 'Add All_Online_Count to category channel',
							value: 'd',
						},
                        {
							label: 'All_Offline_Count',
							description: 'Add All_Offline_Count to category channel',
							value: 'e',
						},
                        {
							label: 'User_Online_Count',
							description: 'Add User_Online_Count to category channel',
							value: 'f',
						},
                        {
							label: 'User_Idle_Count',
							description: 'Add User_Idle_Count to category channel',
							value: 'g',
						},
                        {
							label: 'User_Dnd_Count',
							description: 'Add User_Dnd_Count to category channel',
							value: 'h',
						},
                        {
							label: 'User_Offline_Count',
							description: 'Add User_Offline_Count to category channel',
							value: 'i',
						},
					]),
				);
        
		
        console.log(Select_Menu.components[0].options[0].data.label);
		msg = await interaction.reply({ content: 'werwerew', components: [Select_Menu] });
		async function fuck(index){

			console.log(Select_Menu.components[0].options[0].data.label)
		}

		// collector event1 收集用戶選擇的選項
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 5000 });
        collector.on('collect',async i => {
            if (i.user.id === interaction.user.id) {
				// console.log(`${JSON.stringify(Select_Menu.components[0].options[0].data.label)}`);
				// x = [];
				// console.log(i.values);
				// x= Get_Chosen_label(i.values);
				const labels = Get_Chosen_label(i.values).join(', ');
				console.log('ok')
                // await i.reply(`${i.user.tag} clicked on the ${i.customId} button.`);
				// console.log(JSON.stringify(i.customId));
				// const values = i.values.map( value => { values})
					// const options = i.Select_Menu.components[0].options;
					// const selectedOptions = i.values.map(value => options.find(option => option.value === value)); // 获取选中选项对应的 SelectMenuOption 对象
					// const selectedLabels = selectedOptions.map(option => option.label); 
					// await i.update({ content: `Selected ${ x= selectedLabels.join(', ')}`, components: [Button] });
				// console.log(options);
				// console.log(i.values[1]);
				await i.reply({ content: `Selected ${labels}`, components: [Button] });
            } else {
                i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });
            collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
		
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