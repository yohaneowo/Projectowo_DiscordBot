const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
							value: '1',
						},
						{
							label: 'Users_Count',
							description: 'Add Users_Count to category channel',
							value: '2',
						},
						{
							label: 'Bots_Count',
							description: 'Add Bots_Count to category channel',
							value: '3',
						},
                        {
							label: 'All_Online_Count',
							description: 'Add All_Online_Count to category channel',
							value: '4',
						},
                        {
							label: 'All_Offline_Count',
							description: 'Add All_Offline_Count to category channel',
							value: '5',
						},
                        {
							label: 'User_Online_Count',
							description: 'Add User_Online_Count to category channel',
							value: '6',
						},
                        {
							label: 'User_Idle_Count',
							description: 'Add User_Idle_Count to category channel',
							value: '7',
						},
                        {
							label: 'User_Dnd_Count',
							description: 'Add User_Dnd_Count to category channel',
							value: '8',
						},
                        {
							label: 'User_Offline_Count',
							description: 'Add User_Offline_Count to category channel',
							value: '9',
						},
					]),
				);
            
        
		await interaction.reply({ content: 'Select !', components: [Select_Menu, Button] });
        

       
    },
}