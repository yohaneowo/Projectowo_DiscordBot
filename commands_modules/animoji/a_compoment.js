const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { ComponentType } = require('discord.js');

const modal = new ModalBuilder()
    .setCustomId('modal')
    .setTitle('Animoji owo_b')

const prefixInput = new TextInputBuilder()
    .setLabel("Set your own prefix")
    .setCustomId('prefix')
    .setPlaceholder('Enter a prefix')
    .setMinLength(1)
    .setValue('>')
    .setStyle(TextInputStyle.Short)

const firstActionRow = new ActionRowBuilder().addComponents(prefixInput)
modal.addComponents(firstActionRow)

module.exports = {
    modal,
}