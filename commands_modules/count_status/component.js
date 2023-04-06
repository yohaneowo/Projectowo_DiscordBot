const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');
class member_count_components {
	Button = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Select Done !')
				.setStyle(ButtonStyle.Primary),
		)
    
	
    // 下拉選項菜單
    Select_Menu = new ActionRowBuilder()
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
						value: '0',
					},
					{
						label: 'Users_Count',
						description: 'Add Users_Count to category channel',
						value: '1',
					},
					{
						label: 'Bots_Count',
						description: 'Add Bots_Count to category channel',
						value: '2',
					},
					{
						label: 'All_Online_Count',
						description: 'Add All_Online_Count to category channel',
						value: '3',
					},
						{
						label: 'All_Online_Count_include_idle',
						description: 'Add All_Members_Count to category channel',
						value: '4',
					},
					{
						label: 'All_Online_Count_include_idle_dnd',
						description: 'Add All_Members_Count to category channel',
						value: '5',
					},
					{
						label: 'All_Offline_Count',
						description: 'Add All_Offline_Count to category channel',
						value: '6',
					},
					{
						label: 'User_Online_Count',
						description: 'Add User_Online_Count to category channel',
						value: '7',
					},
						{
						label: 'User_Online_Count_include_idle',
						description: 'Add Users_Count to category channel',
						value: '8',
					},
					{
						label: 'User_Online_Count_include_idle_dnd',
						description: 'Add Users_Count to category channel',
						value: '9',
					},
					{
						label: 'User_Idle_Count',
						description: 'Add User_Idle_Count to category channel',
						value: '10',
					},
					{
						label: 'User_Dnd_Count',
						description: 'Add User_Dnd_Count to category channel',
						value: '11',
					},
					{
						label: 'User_Offline_Count',
						description: 'Add User_Offline_Count to category channel',
						value: '12',
					},
				]),
			)
}

class ServerStatusIds {
	ServerStatusIds() {
		this.Guild_Id = '';
		this.Category_Id = '';
		this.All_Members_Count_Id = '';
		this.Users_Count_Id = '';
		this.Bots_Count_Id = '';
		this.All_Online_Count_Id = '';
		this.All_Online_Count_include_idle_Id = '';
		this.All_Online_Count_include_idle_dnd_Id = '';
		this.All_Offline_Count_Id = '';
		this.User_Online_Count_Id = '';
		this.User_Online_Count_include_idle_Id = '';
		this.User_Online_Count_include_idle_dnd_Id = '';
		this.User_Idle_Count_Id = '';
		this.User_Dnd_Count_Id = '';
		this.User_Offline_Count_Id = '';
		this.User_Id = '';
		this.datetime = '';
		this.Menu_Select_Values = '';
	}
}
// 输出component模块
module.exports = {
    // 按钮
   member_count_components,ServerStatusIds
}