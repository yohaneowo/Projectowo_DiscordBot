const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType ,PermissionsBitField } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        interaction.deferReply({ content: `awit asasa`, ephemeral: true });
        interaction.Reply('sasasa')
    },
}