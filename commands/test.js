const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType ,PermissionsBitField } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction, client) {
        // interaction.deferReply();
        // await wait(4000);
        const errChannel = "1094086417543598181"

        const embed = new EmbedBuilder()
            .setTitle('┏━°⌜ Error Handling System ⌟°━┓')
            .setColor(0x3651d9)
            .setDescription('如你所見')
            .setThumbnail('https://thumbs.dreamstime.com/z/error-rubber-stamp-word-error-inside-illustration-109026446.jpg')
            .addFields(
                { name: 'Error', value: 'err', inline: true },
            )
            .setFooter({text : interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        interaction.reply({embeds: [embed], ephemeral: true});
        // client.channels.cache.get(errChannel).send('popopopopopopopopopopopopopo')
        // interaction.editReply({ content: `awit asasa`, ephemeral: true });
    },
}