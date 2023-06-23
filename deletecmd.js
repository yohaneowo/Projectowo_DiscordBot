const { REST, Routes } = require("discord.js");
require("dotenv").config();
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// ...

// for guild-based commands
rest
  .put(Routes.applicationGuildCommands(process.env.CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(async (err) => {
    console.error(err);
  });

// for global commands
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(async (err) => {
    console.error(err);
  });
