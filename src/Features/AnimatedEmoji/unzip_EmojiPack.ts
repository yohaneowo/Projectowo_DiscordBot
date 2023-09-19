


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
// const fs = require("node:fs")



// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
// const path = require("node:path")


// var AdmZip = require("adm-zip")




// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'unzip_Emoj... Remove this comment to see the full error message
// async function unzip_EmojiPack(emojiPack_name) {


//   const emojiZipPath = path.join(process.cwd(), "src/lib/emoji/emoji_zips")
//   const emojiZipFiles = fs
//     .readdirSync(emojiZipPath)
//     .filter((file) => file === emojiPack_name + ".zip")
//   console.log(emojiZipFiles)
//   const emojiZipFilePath = path.join(emojiZipPath, emojiZipFiles[0])
//   console.log(emojiZipFilePath)
//   var zip = new AdmZip(emojiZipFilePath)
//   const newFoldername = emojiZipFiles[0].replace(".zip", "")
//   zip.extractAllTo(


//     `${process.cwd()}/lib/emoji/emoji_packs/${newFoldername}`,
//     true
//   )
// }



// module.exports = unzip_EmojiPack
