


// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'chromium'.
// const { chromium } = require("playwright")




// // @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'download_Z... Remove this comment to see the full error message
// async function download_Zip(url, emojiPackName) {
//   const browser = await chromium.launch()
//   const context = await browser.newContext({})
//   const page = await context.newPage()

//   try {
//     await page.goto(url, {
//       waitUntil: "networkidle"
//     })

//     // selector for urgent use
//     // const buttonElement = await page.waitForSelector(
//     //   "div.ui.fluid.vertical.buttons button.ui.secondary.button"
//     // );

//     await page.getByText("Download all emojis as zip").click()
//     const downloadPromise = page.waitForEvent("download")
//     const download = await downloadPromise
//     // Wait for the download process to complete
//     // Save downloaded file somewhere
//     await download.saveAs(`./lib/emoji/emoji_zips/${emojiPackName}.zip`)
//   } catch (error) {
//     console.log(error)
//   }

//   await browser.close()
// }



// module.exports = download_Zip
