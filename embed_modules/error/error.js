const {EmbedBuilder} = require('discord.js');
class ErrorEmbed {
    ErrorEmbed() {
        this.embed = new EmbedBuilder()
            .setTitle('┏━°⌜ Error Handling System ⌟°━┓')
            .setColor(0x3651d9)
            .setDescription('如你所見')
            .setThumbnail('https://thumbs.dreamstime.com/z/error-rubber-stamp-word-error-inside-illustration-109026446.jpg')
            .addFields(
                { name: 'Error', value: 'err', inline: true },
            )
            .setFooter({text : interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    }
}   
module.exports = {
    ErrorEmbed
}