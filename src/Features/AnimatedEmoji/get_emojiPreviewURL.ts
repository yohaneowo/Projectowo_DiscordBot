


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'chromium'.
// const { chromium } = require("playwright")




// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'get_emojiP... Remove this comment to see the full error message
// async function get_emojiPreviewURL(url) {
//   const browser = await chromium.launch()
//   const context = await browser.newContext({})
//   const page = await context.newPage()
//   const gifEmojiPreviewURL = []
//   const pngEmojiPreviewURL = []

//   try {
//     await page.goto(url, {
//       waitUntil: "networkidle"
//     })
//     const imgSrcs = await page.$$eval("img", (images) => {
//       return images.map((img) => img.getAttribute("src"))
//     })

//     // console.log(imgSrcs);
//     for (const imgSrc of imgSrcs) {
//       const png_Regex =
//         /http[s]:\/\/cdn.discordapp.com\/emojis\/([a-zA-Z0-9]+).(png)\?(:?[a-zA-Z0-9=]+)/
//       const gif_Regex =
//         /http[s]:\/\/cdn.discordapp.com\/emojis\/([a-zA-Z0-9]+).(gif)\?(:?[a-zA-Z0-9=]+)/
//       if (imgSrc.match(png_Regex)) {



//         // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
//         pngEmojiPreviewURL.push(imgSrc)
//       }
//       if (imgSrc.match(gif_Regex)) {



//         // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
//         gifEmojiPreviewURL.push(imgSrc)
//       }
//     }
//     // console.log(gifEmojiPreviewURL);
//     // console.log(pngEmojiPreviewURL);
//   } catch (error) {
//     console.log(error)
//   }

//   await browser.close()
//   // console.log(gifEmojiPreviewURL);
//   return {
//     gifEmojiPreviewURL,
//     pngEmojiPreviewURL
//   }
// }



// module.exports = get_emojiPreviewURL
