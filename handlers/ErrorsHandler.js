const { EmbedBuilder } = require('discord.js');

module.exports =  (client) => {
    
    const errChannel = "1088861099761344522"
    process.on('unhandledRejection', (reason, promise) => {
        console.log('[Anti-crash] :: Unhandled Rejection/Catch')
        console.log(reason, promise);
        const errEmbed1 = new EmbedBuilder()

            .setTitle("New Error")
            .setDescription(reason + promise)
            .setTimestamp()
            .setFooter("Anti Crash System")

        client.channels.cache.get(errChannel).send({embeds: [errEmbed1]})
    })

    process.on('uncaughtException', (err, origin) => {
        console.log(client.channel);
        console.log('[Anti-crash] :: uncaughtException/Catch')
        console.log(err, origin);
            console.log(client.channel);
        const errEmbed2 = new EmbedBuilder()
 
            .setTitle("New Error")
            .setDescription(err + origin)
            .setTimestamp()
            .setFooter("Anti Crash System")
        
        client.channel.send({ embeds: [errEmbed2] })
    })

    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(client.channel);
        console.log('[Anti-crash] :: uncaughtExceptionMonitor/Catch')
        console.log(err, origin);
        console.log(client.channel);
        const errEmbed3 = new EmbedBuilder()

            .setTitle("New Error")
            .setDescription(err + origin)
            .setTimestamp()
            .setFooter("Anti Crash System")

        client.channel.send({ embeds: [errEmbed3] })
    })

   
}