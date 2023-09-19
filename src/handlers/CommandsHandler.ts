


import fs from "node:fs"


import path from "node:path"


import { Collection } from "discord.js"


module.exports = (client) => {
  client.commands = new Collection()
  console.log("CommandsHandler")
  const featuresPath = path.join(process.cwd(), "dist/Features")
  fs.readdirSync(featuresPath).forEach((feature) => {
    const subFeaturePath = path.join(featuresPath, feature)
    const commandPath = path.join(subFeaturePath, "Command")
    if (fs.existsSync(commandPath)) {
      const command_files = fs
        .readdirSync(commandPath)
        .filter((file) => file.endsWith(".js"))
      for (const command_file of command_files) {

        const filepath = path.join(commandPath, command_file)


        const command = require(filepath)
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command)
        } else {
          console.log(
            `command at ${filepath} missing a require 'data' or 'execute' property`
          )
        }
      }
    }
  })
}
