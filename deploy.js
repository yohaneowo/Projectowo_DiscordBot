const { REST, Routes } = require("discord.js")
const fs = require("node:fs")
const path = require("node:path")
require("dotenv").config()

const commands = []
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, "interaction", "Commands")
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./interaction/Commands/${file}`)
  //   console.log(command.data.toJSON())
  commands.push(command.data.toJSON())
}
let token
if (process.env.NODE_ENV === "production") {
  console.log("production deployment")
  token = process.env.PRODUCTION_DISCORD_TOKEN
} else {
  console.log("development deployment")
  token = process.env.DEV_DISCORD_TOKEN
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )
    // The put method is used to fully refresh all commands in the guild with the current set
    let client_ID
    if (process.env.NODE_ENV === "production") {
      console.log("production deployment")

      client_ID = process.env.PRODUCTION_CLIENT_ID
    } else {
      console.log("development deployment")

      client_ID = process.env.DEV_CLIENT_ID
    }

    const data = await rest.put(Routes.applicationCommands(client_ID), {
      body: commands
    })

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
