const {  ChannelType, PermissionsBitField} = require('discord.js');
class manage_channel_function {
    create_Category(interaction){
                const parent =  interaction.guild.channels.create({
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
        }
        
    create_All_Members_Count(interaction, All_Members_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `All_Members_Count : ${All_Members_Count}`,
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
                parent: parent,
            })
            return channel;
        }



    create_Users_Count(interaction, Users_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `Users_Count : ${Users_Count}`,
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
                parent: parent,
            })
            return channel;
        }

    create_Bots_Count(interaction, Bots_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `Bots_Count : ${Bots_Count}`,
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
                parent: parent,
            })
            return channel;
        }

    create_All_Online_Count(interaction, All_Online_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `All_Online_Count : ${All_Online_Count}`,
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
                parent: parent,
            })
            return channel;
        }

    create_All_Online_Count_include_idle(interaction, All_Online_Count_include_idle, parent){
            const channel =  interaction.guild.channels.create({
                name: `All_Members_Count_include_idle : ${All_Online_Count_include_idle}`,
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
                parent: parent,
            })
            return channel;
        }

    create_All_Online_Count_include_idle_dnd(interaction, All_Online_Count_include_idle_dnd, parent){
            const channel =  interaction.guild.channels.create({
                name: `All_Members_Count_include_idle_dnd : ${All_Online_Count_include_idle_dnd}`,
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
                parent: parent,
            })
            return channel;
        }

    create_All_Offline_Count(interaction, All_Offline_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `All_Offline_Count : ${All_Offline_Count}`,
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
                parent: parent,
            })
            return channel;
        }

        create_User_Online_Count(interaction, User_Online_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Online_Count : ${User_Online_Count}`,
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
                parent: parent,
            })
            return channel;
        }

        create_User_Online_Count_include_idle(interaction, User_Online_Count_include_idle, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Online_Count_include_idle : ${User_Online_Count_include_idle}`,
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
                parent: parent,
            })
            return channel;
        }

        create_User_Online_Count_include_idle_dnd(interaction, User_Online_Count_include_idle_dnd, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Online_Count_include_idle_dnd : ${User_Online_Count_include_idle_dnd}`,
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
                parent: parent,
            })
            return channel;
        }

        create_UUser_Idle_Count(interaction, User_Idle_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Idle_Count : ${User_Idle_Count}`,
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
                parent: parent,
            })
            return channel;
        }

        create_User_Dnd_Count(interaction, User_Dnd_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Dnd_Count : ${User_Dnd_Count}`,
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
                parent: parent,
            })
            return channel;
        }

        create_User_Offline_Count(interaction, User_Offline_Count, parent){
            const channel =  interaction.guild.channels.create({
                name: `User_Offline_Count : ${User_Offline_Count}`,
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
                parent: parent,
            })
            return channel;
        }
}
module.exports = {
    manage_channel_function
}