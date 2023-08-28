const fs = require("node:fs");
const path = require("node:path");
var AdmZip = require("adm-zip");

async function unzip_EmojiPack(emojiPack_name) {
  const emojiZipPath = path.join(process.cwd(), "lib/emoji/emoji_zips");
  const emojiZipFiles = fs
    .readdirSync(emojiZipPath)
    .filter((file) => file === emojiPack_name + ".zip");
  console.log(emojiZipFiles);
  const emojiZipFilePath = path.join(emojiZipPath, emojiZipFiles[0]);
  console.log(emojiZipFilePath);
  var zip = new AdmZip(emojiZipFilePath);
  const newFoldername = emojiZipFiles[0].replace(".zip", "");
  zip.extractAllTo(
    `${process.cwd()}/lib/emoji/emoji_packs/${newFoldername}`,
    true
  );
}

module.exports = unzip_EmojiPack;
