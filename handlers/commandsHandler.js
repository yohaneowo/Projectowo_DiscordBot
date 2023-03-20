const fs = require('node:fs');
const path = require('node:path');
const {Collection} = require('discord.js');

module.exports = (client) => {
    client.commands = new Collection();
    const commandspath = path.join(process.cwd(),'commands')
    const commandfiles = fs.readdirSync(commandspath).filter(file => file.endsWith('.js'));
    for (const commandfile of commandfiles) {
        const filepath = path.join(commandspath, commandfile);
        const command = require(filepath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }else {
            console.log(`command at ${filepath} missing a require 'data' or 'execute' property`);
        }
    }
}