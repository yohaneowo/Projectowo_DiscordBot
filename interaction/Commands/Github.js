const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Github Repository'),
    async execute(interaction, client) {
        await interaction.reply('https://github.com/Yohanewww/DiscordBot-Project_QAQ')
    },
    
};