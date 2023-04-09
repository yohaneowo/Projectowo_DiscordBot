const client = require('../index.js')
const { ActivityType } = require('discord.js');

async function setActivity(client) {
    client.user.setActivity(`with ${client.guilds.cache.reduce((a, g) => a + g.members.cache.size, 0)} members`, { type: ActivityType.Watching });
    console.log('hi')
}
setInterval(() => setActivity(client), 1000 * 60 * 5 );

