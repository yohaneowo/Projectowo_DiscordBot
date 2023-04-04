
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ChannelType, PermissionsBitField, setPosition} = require('discord.js');
const { ComponentType } = require('discord.js');
module.exports = {
    data : new SlashCommandBuilder ()
        .setName('test')
        .setDescription("test command"),

    async execute(interaction,client, message) {
        async function create_Category(){
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
        }
        async function create_All_Members_Count(parent){
            await interaction.guild.channels.create({
                name: 'All_Members_Count :',
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
        }

        // async function create_Users_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'Users_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_Bots_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'Bots_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_All_Online_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'All_Online_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_All_Offline_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'All_Offline_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_User_Online_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'User_Online_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function User_Idle_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'User_Idle_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_User_Dnd_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'User_Dnd_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        // async function create_User_Offline_Count(parent){
        //     await interaction.guild.channels.create({
        //         name: 'User_Offline_Count :',
        //         type: ChannelType.GuildVoice,
        //         permissionOverwrites: [
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.ManageChannels],
        //             },
        //             {
        //             id: interaction.guild.roles.everyone,
        //             deny: [PermissionsBitField.Flags.Connect],
        //             },
        //         ],
        //         parent: parent,
        //     })
        // }

        

        
        try {
            interaction.deferReply();
            const parent = await create_Category();

            console.log(parent);
            await create_All_Members_Count(parent);
            // await create_Users_Count(parent);
            // await create_Bots_Count(parent);
            // await create_All_Online_Count(parent);
            // await create_All_Offline_Count(parent);
            // await create_User_Online_Count(parent);
            // await User_Idle_Count(parent);
            // await create_User_Dnd_Count(parent);
            // await create_User_Offline_Count(parent);
            interaction.editReply('Success!');
            } catch (error) {
                console.error(error);
                interaction.reply('An error occurred while creating the channels.');
            }
        









    }
}