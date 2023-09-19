


import fs from "node:fs"
import path from "node:path"
import { Collection } from "discord.js"



module.exports = (client) => {
  console.log("EventHandler")
  client.commands = new Collection()


  const featuresPath = path.join(process.cwd(), "dist/Features")
  fs.readdirSync(featuresPath).forEach((feature) => {
    const subFeaturePath = path.join(featuresPath, feature)
    console.log(`subFeaturePath: ${subFeaturePath}`)
    const eventPath = path.join(subFeaturePath, "Event")
    console.log(`eventPath: ${eventPath}`)
    if (fs.existsSync(eventPath)) {
      console.log('im in ')
      const event_files = fs
        .readdirSync(eventPath)
        .filter((file) => file.endsWith(".js"))
      for (const event_file of event_files) {
        console.log('im in 2')
      console.log(`event_files: ${event_file}`)

        const eventsFilePath = path.join(eventPath, event_file)


        const event = require(eventsFilePath)
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client))
        } else {
          client.on(event.name, (...args) => event.execute(...args, client))
        }
      }
    }
  })
}
