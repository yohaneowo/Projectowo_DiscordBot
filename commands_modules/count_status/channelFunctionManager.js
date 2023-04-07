const {  ChannelType, PermissionsBitField} = require('discord.js');
class MemberCount_ManageFunctions {
    // Create Channels
    async createChannel(interaction, selectedOpt, parentChannel, selectedOptCount){
        switch (selectedOpt) {
            case 'Category':
                const parent = await interaction.guild.channels.create({
                    name: '📊 SERVER STATS 📊',
                    type: ChannelType.GuildCategory,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                    ],
                })
                return parent;
            case 'All_Members_Count':
                const All_Members_Count = await interaction.guild.channels.create({
                    name: `All_Members_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return All_Members_Count;
            case 'Users_Count':
                const Users_Count = await interaction.guild.channels.create({
                    name: `Users_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Count;
            case 'Bots_Count':
                const Bots_Count = await interaction.guild.channels.create({
                    name: `Bots_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Bots_Count;
            case 'All_Online_Count':
                const All_Online_Count = await interaction.guild.channels.create({
                    name: `All_Online_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return All_Online_Count;
            case 'All_Online_Count_include_idle':
                const All_Online_Count_include_idle = await interaction.guild.channels.create({
                    name: `All_Online_Count_include_idle : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return All_Online_Count_include_idle;
            case 'All_Online_Count_include_idle_dnd':
                const All_Online_Count_include_idle_dnd = await interaction.guild.channels.create({
                    name: `All_Online_Count_include_idle_dnd : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return All_Online_Count_include_idle_dnd;
                case 'All_Offline_Count':
                const All_Offline_Count = await interaction.guild.channels.create({
                    name: `All_Offline_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return All_Offline_Count;
                case 'Users_Online_Count':
                const Users_Online_Count = await interaction.guild.channels.create({
                    name: `Users_Online_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Online_Count;
                case 'Users_Online_Count_include_idle':
                const Users_Online_Count_include_idle = await interaction.guild.channels.create({
                    name: `Users_Online_Count_include_idle : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Online_Count_include_idle;
                case 'Users_Online_Count_include_idle_dnd':
                const Users_Online_Count_include_idle_dnd = await interaction.guild.channels.create({
                    name: `Users_Online_Count_include_idle_dnd : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Online_Count_include_idle_dnd;
                case 'Users_Idle_Count':
                const Users_Idle_Count = await interaction.guild.channels.create({
                    name: `Users_Idle_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Idle_Count;
                case 'Users_Dnd_Count':
                const Users_Dnd_Count = await interaction.guild.channels.create({
                    name: `Users_Dnd_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Dnd_Count;
                case 'Users_Offline_Count':
                const Users_Offline_Count = await interaction.guild.channels.create({
                    name: `Users_Offline_Count : ${selectedOptCount}`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.Connect],
                        },
                    ],
                    parent: parentChannel,
                })
                return Users_Offline_Count;
                

        }       
    }

   
   

}
module.exports = {
    MemberCount_ManageFunctions
}