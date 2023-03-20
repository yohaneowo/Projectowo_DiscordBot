const fs = require('node:fs');
const path = require("node:path");

module.exports = (client, Discord) => {
    const eventsPath = path.join(process.cwd(), "events");
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
    for (const eventsFile of eventsFiles) {
        const eventsFilePath = path.join(eventsPath, eventsFile);
        const event = require(eventsFilePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, Discord));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, Discord));
        }
    }
}