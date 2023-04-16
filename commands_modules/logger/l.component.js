const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

class Logger_Interaction_Component {
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
				.setMaxValues(22)
				.addOptions([
					{
						label: 'channelCreate ',
						description: 'Add channelCreate to category channel',
						value: '0',
					},
                    {
                        label: 'channelUpdate ',
                        description: 'Add channelUpdate to category channel',
                        value: '1',
                    },
                    {
                        label: 'channelDelete ',
                        description: 'Add channelDelete to category channel',
                        value: '2',
                    },
                    {
                        label: 'guildBanAdd ',
                        description: 'Add guildBanAdd to category channel',
                        value: '3',
                    },
                    {
                        label: 'guildBanRemove ',
                        description: 'Add guildBanRemove to category channel',
                        value: '4',
                    },
                    {
                        label: 'guildRoleCreate ',
                        description: 'Add guildRoleCreate to category channel',
                        value: '5',
                    },
                    {
                        label: 'guildRoleDelete ',
                        description: 'Add guildRoleDelete to category channel',
                        value: '6',
                    },
                    {
                        label: 'guildRoleUpdate ',
                        description: 'Add guildRoleUpdate to category channel',
                        value: '7',
                    },
                    {
                        label: 'guildUpdate ',
                        description: 'Add guildUpdate to category channel',
                        value: '8',
                    },
                    {
                        label: 'messageDelete ',
                        description: 'Add messageDelete to category channel',
                        value: '9',
                    },
                    {
                        label: 'messageDeleteBulk ',
                        description: 'Add messageDeleteBulk to category channel',
                        value: '10',
                    },
                    {
                        label: 'messageUpdate ',
                        description: 'Add messageUpdate to category channel',
                        value: '11',
                    },
                    {
                        label: 'guildMemberAdd ',
                        description: 'Add guildMemberAdd to category channel',
                        value: '12',
                    },
                    {
                        label: 'guildMemberKick ',
                        description: 'Add guildMemberKick to category channel',
                        value: '13',
                    },
                    {
                        label: 'guildMemberRemove ',
                        description: 'Add guildMemberRemove to category channel',
                        value: '14',
                    },
                    {
                        label: 'guildMemberUpdate ',
                        description: 'Add guildMemberUpdate to category channel',
                        value: '15',
                    },
                    {
                        label: 'guildMemberNickUpdate ',
                        description: 'Add guildMemberNickUpdate to category channel',
                        value: '16',
                    },
                    {
                        label: 'voiceChannelLeave ',
                        description: 'Add voiceChannelLeave to category channel',
                        value: '17',
                    },
                    {
                        label: 'voiceChannelJoin ',
                        description: 'Add voiceChannelJoin to category channel',
                        value: '18',
                    },
                    {
                        label: 'voiceStateUpdate ',
                        description: 'Add voiceStateUpdate to category channel',
                        value: '19',
                    },
                    {
                        label: 'voiceChannelSwitch ',
                        description: 'Add voiceChannelSwitch to category channel',
                        value: '20',
                    },
                    {
                        label: 'guildEmojisUpdate ',
                        description: 'Add guildEmojisUpdate to category channel',
                        value: '21',
                    },
                    

					
				]),
			)

}

class Logger_Channel_Ids {
        Logger_Channel_Ids() {
        this.Guild_Id = "",
        this.Category_Id = "",
        this.channelCreate_Id = " ",
        this.channelUpdate_Id = " ",
        this.channelDelete_Id = " ",
        this.guildBanAdd_Id = " ",
        this.guildBanRemove_Id = " ",
        this.guildRoleCreate_Id = " ",
        this.guildRoleDelete_Id = " ",
        this.guildRoleUpdate_Id = " ",
        this.guildUpdate_Id = " ",
        this.messageDelete_Id = " ",
        this.messageDeleteBulk_Id = " ",
        this.messageUpdate_Id = " ",
        this.guildMemberAdd_Id = " ",
        this.guildMemberKick_Id = " ",
        this.guildMemberRemove_Id = " ",
        this.guildMemberUpdate_Id = " ",
        this.guildMemberNickUpdate_Id = " ",
        this.voiceChannelLeave_Id = " ",
        this.voiceChannelJoin_Id = " ",
        this.voiceStateUpdate_Id = " ",
        this.voiceChannelSwitch_Id = " ",
        this.guildEmojisUpdate_Id = " ",
        this.Menu_Select_Values = ""
    }
}

module.exports = {
    Logger_Interaction_Component, Logger_Channel_Ids
}