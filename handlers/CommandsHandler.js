const fs = require('node:fs');
const path = require('node:path');
const {Collection} = require('discord.js');

module.exports = (client) => {
    client.commands = new Collection();
    const commands_path = path.join(process.cwd(), 'interaction', 'Commands')
    const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));
    for (const command_file of command_files) {
        const filepath = path.join(commands_path, command_file);
        const command = require(filepath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }else {
            console.log(`command at ${filepath} missing a require 'data' or 'execute' property`);
        }
    }
}