const LaucnhTimeStamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
module.exports = {
    name: 'ready',
    once: false,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}，${LaucnhTimeStamp}`);
    }
}