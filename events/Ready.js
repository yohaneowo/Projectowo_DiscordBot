const LaunchTimeStamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
client = require("../index.js");
module.exports = {
    name: 'ready',
    once: false,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}，${LaunchTimeStamp}`);
        //  require("./ErrorsHandler.js")(client);
    }
}