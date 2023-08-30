const { REST, Routes } = require("discord.js")
require("dotenv").config()

let token
if (process.env.NODE_ENV === "production") {
  token = process.env.PRODUCTION_DISCORD_TOKEN
} else {
  token = process.env.DEV_DISCORD_TOKEN
}

const rest = new REST({ version: "10" }).setToken(token)

// ...

// for guild-based commands
let client_ID
if (process.env.NODE_ENV === "production") {
  client_ID = process.env.PRODUCTION_CLIENT_ID
} else {
  client_ID = process.env.DEV_CLIENT_ID
}
rest
  .put(Routes.applicationGuildCommands(client_ID), { body: [] })
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(async (err) => {
    console.error(err)
  })

// for global commands
rest
  .put(Routes.applicationCommands(client_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(async (err) => {
    console.error(err)
  })
