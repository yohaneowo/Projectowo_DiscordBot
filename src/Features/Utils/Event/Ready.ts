const LaunchTimeStamp = new Date().toLocaleString("zh-TW", {
  timeZone: "Asia/Taipei"
})


module.exports = {
  name: "ready",
  once: false,
  async execute(client) {
    const packageJson = require("../../../../package.json")
    console.log(`Current version: ${packageJson.version}`)

    console.log(`Ready! Logged in as ${client.user.tag}，${LaunchTimeStamp}`)
    //  require("./ErrorsHandler.js")(client);
  }
}
