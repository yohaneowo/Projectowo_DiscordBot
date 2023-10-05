const { REST, Routes } = require("discord.js")
const fs = require("node:fs")
const path = require("node:path")
require("dotenv").config()
const util = require("util")
const stat = util.promisify(fs.stat)
require("module-alias/register")

const commands = []
// Grab all the command files from the commands directory you created earlier
async function getCommands() {
  const featuresPath = path.join(__dirname, "dist", "Features")
  const featureFolder = fs.readdirSync(featuresPath)

  for (const folder of featureFolder) {
    commandFolderPath = path.join(featuresPath, folder, "Command")

    if (fs.existsSync(commandFolderPath)) {
      const stats = await stat(commandFolderPath)

      if (!stats.isDirectory()) {
        console.error("Directory does not exist.")
      } else {
        console.log("Directory exists.")
        // console.log(commandFolderPath)

        const commandFiles = fs
          .readdirSync(commandFolderPath)
          .filter((file) => file.endsWith(".js"))

        // console.log(commandFiles)

        for (const file of commandFiles) {
          // console.log(file)
          console.log(`./dist/Features/${folder}/Command/${file}`)

          const command = require(`./dist/Features/${folder}/Command/${file}`)
          // console.log(command.data.toJSON());

          commands.push(command.data.toJSON())
        }
      }
    }
  }
}
getCommands().then(() => {
  console.log(commands)
  let token
  if (process.env.NODE_ENV === "production") {
    console.log("production deployment")
    token = process.env.PRODUCTION_DISCORD_TOKEN
  } else {
    console.log("development deployment")
    token = process.env.DEV_DISCORD_TOKEN
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: "10" })z.setToken(token)

  // and deploy your commands!
  ;(async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      )

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
})
