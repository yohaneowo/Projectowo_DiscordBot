const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType ,PermissionsBitField } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        // interaction.deferReply({ ephemeral: true });
        function create_Category(){
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
        
        function create_All_Members_Count(parent){
                 const x = interaction.guild.channels.create({
                    name: `All_Members_Count :`,
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
                return x;
            }

        const parent = await create_Category();
        const x = await create_All_Members_Count(parent);
        interaction.reply({ content: `${x.id}`, ephemeral: true });
        console.log(x);
                
    },
}