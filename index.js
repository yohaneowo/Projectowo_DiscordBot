// Require the necessary discord.js classes
require("dotenv").config()
const { Client, GatewayIntentBits } = require("discord.js")
var figlet = require("figlet")
const app = require("./express.js")
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`)
})

// Create a new client instance
const client = new Client({
  intents: [3276799, GatewayIntentBits.GuildPresences, 8]
})
module.exports = client

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
;["EventsHandler", "CommandsHandler", "ErrorsHandler", "Function"].forEach(
  (handler) => {
    require(`./handlers/${handler}`)(client, Client)
  }
)

figlet("Project UwU ", function (err, data) {
  if (err) {
    console.log("Something went wrong...")
    console.dir(err)
    return
    // test 2
  }
  console.log(data)
})

// Automatic choose token
let token
if (process.env.NODE_ENV === "production") {
  token = process.env.PRODUCTION_DISCORD_TOKEN
} else {
  token = process.env.DEV_DISCORD_TOKEN
}

// Log in to Discord with your client's token
client.login(token)
