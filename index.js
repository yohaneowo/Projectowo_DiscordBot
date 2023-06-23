// Require the necessary discord.js classes
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
// Create a new client instance
const client = new Client({
  intents: [3276799, GatewayIntentBits.GuildPresences, 8]
});
module.exports = client

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
;["EventsHandler", "CommandsHandler", "ErrorsHandler", "Function"].forEach(
  (handler) => {
    require(`./handlers/${handler}`)(client, Client);
  }
);

// Log in to Discord with your client's token

client.login(process.env.DISCORD_TOKEN);
