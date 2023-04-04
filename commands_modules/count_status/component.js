const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');

// 输出component模块
module.exports = {
    // 按钮
    Button : Button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Select Done !')
					.setStyle(ButtonStyle.Primary),
			),
    
    // 下拉選項菜單
    Select_Menu : Select_Menu = new ActionRowBuilder()
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
				),
}