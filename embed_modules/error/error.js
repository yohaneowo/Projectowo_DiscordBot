const {EmbedBuilder} = require('discord.js');
const client = require('../../index.js');

class Error_Embed {
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
            .setFooter({text : interaction?.user.username || 'Unknown',
                iconURL: interaction?.user.displayAvatarURL({ dynamic: true })} || 'Unknown')
        client.channels.cache.get(errChannel).send({embeds: [this.embed]});
    }


   
   

}
module.exports = {
    Error_Embed
}