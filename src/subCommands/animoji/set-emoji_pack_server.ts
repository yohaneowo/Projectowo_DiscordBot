const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
  EmbedBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ButtonStyl... Remove this comment to see the full error message
  ButtonStyle,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ButtonBuil... Remove this comment to see the full error message
  ButtonBuilder,



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ActionRowB... Remove this comment to see the full error message
  ActionRowBuilder
} = require("discord.js");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require("node:fs");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require("node:path");
const {



  // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Animoji_Fu... Remove this comment to see the full error message
  Animoji_FunctionManager
} = require("../../commands_modules/animoji/a_FunctionManager.js");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'download_Z... Remove this comment to see the full error message
const download_Zip = require("../../commands_modules/animoji/download_EmojiPack.js");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'unzip_Emoj... Remove this comment to see the full error message
const unzip_EmojiPack = require("../../commands_modules/animoji/unzip_EmojiPack.js");



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'get_emojiP... Remove this comment to see the full error message
const get_emojiPreviewURL = require("../../commands_modules/animoji/get_emojiPreviewURL.js");


module.exports = async (interaction) => {
  const channel_id = interaction.channelId;
  const channel = await interaction.guild.channels.fetch(channel_id);
  const filter = (m) => m.author.id === interaction.user.id;
  await interaction.editReply({
    content:
      "Please provide the Emoji Pack link and Enter <a:OwO:761726340873322546> This Command might cant success due to rate limit"
  });
  channel
    .awaitMessages({ filter, max: 1, time: 5000, errors: ["time"] })
    .then(async (collected) => {
      // only accept message from the user who triggered the command

      try {
        await interaction.editReply({
          content: "Processing your request...  <a:loading:1124029410618658936>"
        });
        collected.first().delete();

        if (collected.first().author.id !== interaction.user.id) return;
        const user_input = collected.first().content;
        // console.log(user_input);
        const https_regex =
          /http[s]?:(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
        const url_matches = user_input.match(https_regex);
        if (url_matches === null) {
          console.log("no URL in your input");
          const reply = await collected
            .at(0)
            .reply("You didn't provide any Emoji Pack link! ");
          setTimeout(() => {
            interaction.deleteReply();
            reply.delete();
          }, 5000);
        } else {
          const url = url_matches[0];
          const nqn_regex = /https:\/\/nqn.blue\/packs\/([a-zA-Z0-9]+)/;
          const nqn_matches = url.match(nqn_regex);
          if (nqn_matches === null) {
            console.log("This is not a valid nqn emoji pack URL");
          } else {
            const url = nqn_matches[0];
            const emojiPack_name = nqn_matches[1];
            const { gifEmojiPreviewURL, pngEmojiPreviewURL } =
              await get_emojiPreviewURL(url);
            console.log(gifEmojiPreviewURL);
            console.log(pngEmojiPreviewURL);

            const emojiPackPreviewEmbed = new EmbedBuilder()
              .setTitle(`${emojiPack_name}`)
              .setURL(url)
              .setThumbnail(`${gifEmojiPreviewURL[0]}`)
              .setDescription(
                `${gifEmojiPreviewURL.length} Gif, ${pngEmojiPreviewURL.length} Png`
              )
              .setTimestamp();
            const confirm = new ButtonBuilder()
              .setCustomId("confirm")
              .setLabel("Confirm")
              .setStyle(ButtonStyle.Success);

            const cancel = new ButtonBuilder()
              .setCustomId("cancel")
              .setLabel("Cancel")
              .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder().addComponents(confirm, cancel);

            const response = await interaction.editReply({
              content:
                " Here is the preview of your Emoji Pack , **Confirm** to set it to your server!",
              embeds: [emojiPackPreviewEmbed],
              components: [row]
            });
            const collectorFilter = (i) => i.user.id === interaction.user.id;
            try {
              const confirmation = await response.awaitMessageComponent({
                filter: collectorFilter,
                time: 60000
              });
              // .catch((err) => console.log(err));
              if (confirmation.customId === "confirm") {
                console.log("test");
                const animojiFunctionManager = new Animoji_FunctionManager();
                const bot_owner_id = "559762654084857876";
                const user_id = interaction.user.id;
                const guild_name = interaction.guild.name;
                const guild_id = interaction.guild.id;
                const isEmojiPack = 1;
                if (user_id !== bot_owner_id)
                  return interaction.editReply({
                    content:
                      "You are not my owner! Only Exclusive for my owner!",
                    ephemeral: true
                  });
                await interaction.editReply({
                  content: "Processing...  <a:loading:1124029410618658936>",
                  ephemeral: true,
                  embeds: [],
                  components: []
                });
                console.log(guild_name);
                const emojiPackPath = path.join(


                  process.cwd(),
                  "lib/emoji/emoji_packs"
                );
                // check emojipack folder name same with guild name or not
                const emojiPackFolder = fs
                  .readdirSync(emojiPackPath)
                  .filter((file) => file.includes(guild_name));

                if (!emojiPackFolder[0])
                  return interaction.editReply({
                    content: `# Emoji Pack and Guild Name are not synced \n**Guild_Name**: ${guild_name} \n**Files_Name** : \n \` \n${fs
                      .readdirSync(emojiPackPath)
                      .join("\n")}  \n \` `,
                    ephemeral: true,
                    embeds: [],
                    components: []
                  });
                await animojiFunctionManager.createGuildEmoji(interaction);
                await animojiFunctionManager.insert_AllEmoji(
                  interaction,
                  guild_id,
                  user_id,
                  isEmojiPack
                );
                await interaction.editReply({
                  content: "Done import emoji_pack",
                  ephemeral: true,
                  embeds: [],
                  components: []
                });
              } else if (confirmation.customId === "cancel") {
                interaction.deleteReply();
              }
            } catch (e) {
              console.log(e);
              await interaction.editReply({
                content:
                  "Confirmation not received within 1 minute, cancelling",
                embeds: [],
                components: []
              });
            }

            // await download_Zip(url, emojiPack_name);
            // await unzip_EmojiPack(emojiPack_name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })

    .catch((collected) => {
      if (collected.size === 0) {
        interaction.editReply({
          content:
            "You didn't provide any Emoji Pack link! <:hehe:761724977099309137>",
          ephemeral: true
        });
        setTimeout(() => {
          interaction.deleteReply();
        }, 60000);
      }
    });
};
