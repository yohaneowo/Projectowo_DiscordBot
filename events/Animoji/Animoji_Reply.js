const {
  Animoji_DatabaseFunction
} = require("../../commands_modules/animoji/a_databaseFunctionManager.js");

const animojiInteraction = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const animojiDbManager = new Animoji_DatabaseFunction();
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    const user_id = message.author.id;
    const content = message.content;
    let all_prefix = await animojiDbManager.getPrefix();
    let user_prefix = "";
    console.time("SearchTime");
    for (const prefix of all_prefix) {
      if (content.includes(prefix)) {
        user_prefix = prefix;
        break;
      }
    }
    // const prefixSet = new Set(all_prefix);
    // const foundPrefix = Array.from(prefixSet).some(prefix => content.includes(prefix));
    console.timeEnd("SearchTime");
    console.log(user_prefix);
    if (user_prefix) {
      const emojis = await animojiDbManager.getAllEmojiName(user_id);
      for (const emoji of emojis) {
        if (content.includes(emoji)) {
          if (content.includes(user_prefix + emoji)) {
            message.delete();
            const emoji_name = emoji;
            const user_avatar = message.author.avatarURL();
            const user_name = message.author.username;
            const emoji_identifier = await animojiDbManager.getEmojiIdentifier(
              emoji_name
            );
            console.log(emoji_identifier);
            message.channel
              .createWebhook({
                name: user_name,
                avatar: user_avatar
              })
              .catch(console.error);
            const webhooks = await message.channel.fetchWebhooks();
            const webhook = webhooks.find((wh) => wh.token);
            try {
              const pattern = user_prefix + emoji;
              const regex = new RegExp(pattern, "g");
              const newContent = content.replace(regex, emoji_identifier);
              await webhook.send({
                content: newContent,
                username: user_name,
                avatarURL: user_avatar
              });
            } catch (err) {
              console.log(err);
            }
            break;
          }
        }
      }
    }
  }
};

module.exports = {
  animojiInteraction
};
