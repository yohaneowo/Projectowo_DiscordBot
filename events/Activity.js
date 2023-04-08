const client = require('../index.js')

module.exports = {
    name: 'channelCreate',
    once: true,
    async execute(client) {
        console.log(`Ready!2 LAAAAAAAAAAAAAAAAAAA ${client.user.tag}`);
    }
}