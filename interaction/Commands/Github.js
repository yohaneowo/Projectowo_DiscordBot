const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Github Repository'),
    async execute(interaction, client) {
        client.guilds.fetch('1096868672187936841').then(guild => {guild.channels.fetch('1096868673924386911')
        .then(async channel => {const inviteLink = await channel.createInvite(maxUses = 1, maxAge = 60*60*24, temporary = false, unique = true, reason = 'Project_QAQ\'s Server')
        await interaction.reply('https://github.com/Yohanewww/DiscordBot-Project_QAQ')
        await interaction.followUp(`${inviteLink}`);
    })})
    },
    
};