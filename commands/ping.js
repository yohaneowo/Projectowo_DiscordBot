const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        const InteractionFinalReply = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('╲⎝⧹Ping⧸⎠╱')
            .setDescription(`**»**⠀\`延迟...${Client.ws.ping}ms\` <a:Meow:761724979720617994>`)
            .setTimestamp()
            .setFooter({ text: interationUser.user.username, iconURL: interationUser.user.avatarURL() })
        await interaction.reply({ embeds: [InteractionFinalReply] })

    },
    
};