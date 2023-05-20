const fs = require('node:fs');
const path = require("node:path");
var AdmZip = require("adm-zip");
console.log(process.cwd())
const emojiZipPath = path.join(process.cwd(), 'lib/emoji/emoji_zips')
const emojiZipFiles = fs.readdirSync(emojiZipPath).filter(file =>file.endsWith('.zip'));
for(const emojiZipFile of emojiZipFiles) {
    const emojiZipFilePath = path.join(emojiZipPath, emojiZipFile);
    var zip = new AdmZip(emojiZipFilePath);
    //  delete .zip
    const newFoldername = emojiZipFile.replace('.zip', '')
    zip.extractAllTo(`${process.cwd()}/lib/emoji/emoji_packs/${newFoldername}`, true)
    
    //  Cut and Paste to emojiZipStorage
    const sourcePath = path.join(process.cwd(), `lib/emoji/emoji_zips/${emojiZipFile}`)
    const destinationPath = path.join(process.cwd(), `lib/emoji/emojiZips_storage/${emojiZipFile}`)
    fs.rename(sourcePath, destinationPath, function (err) {
        if (err) {
            console.log(err)
        }  else {
            console.log("Successfully moved the file!")
        }
    })


}
