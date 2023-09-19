


import client from "../../../index"
import { ActivityType } from "discord.js"

async function setActivity(client) {
  client.user.setActivity(
    `with ${client.guilds.cache.reduce(
      (a, g) => a + g.members.cache.size,
      0
    )} members`,
    { type: ActivityType.Watching }
  )
}
setInterval(() => setActivity(client), 1000 * 60 * 1)
