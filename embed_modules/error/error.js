const {EmbedBuilder} = require('discord.js');
class ErrorEmbed {
    sendChannelError(interaction, err) {
        const errChannel = "1094086417543598181"
        this.embed = new EmbedBuilder()
            .setTitle('┏━°⌜ Error Handling System ⌟°━┓')
            .setColor(0x3651d9)
            .setDescription('出大事啦！')
            .setThumbnail('https://thumbs.dreamstime.com/z/error-rubber-stamp-word-error-inside-illustration-109026446.jpg')
            .addFields(
                { name: `${err.lineNumber}`, value: `${err.fileName}`, inline: true },
                { name: `${err}`, value: `${err.message}` , inline: true },
            )
            .setFooter({text : interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            client.channels.cache.get(errChannel).send({embeds: [errorEmbed.ErrorEmbed(err)]});
    }
}   
module.exports = {
    ErrorEmbed
}

