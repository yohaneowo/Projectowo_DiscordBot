const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');
class MemberCount_Interaction_Components {
	// Button Component FOR Slash Command
	Button = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Select Done !')
				.setStyle(ButtonStyle.Primary),
		)
    
    // Select Menu Component FOR Slash Command
    Select_Menu = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.setMinValues(1)
				.setMaxValues(13)
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

// Temporary Data Storage For Database storing [channels ids]
class ServerStatusIds {
	ServerStatusIds() {
		this.guild_id = '';
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
		this.User_Offline_Count_Id = '';
		this.User_Id = '';
		this.dateTime = '';
		this.selectMenu_Values = '';
	}
}

// Exporting Module
module.exports = {
   MemberCount_Interaction_Components,ServerStatusIds
}