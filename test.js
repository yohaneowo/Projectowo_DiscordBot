const { chromium } = require("playwright")
const https_regex =
  /http[s]?:(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/
const user_input = "hfgdhfg https://nqn.blue/packs/ThePokemonEmotes sdfafds"
const matches = user_input.match(https_regex)
console.log(matches)
if (matches === null) {
  console.log("no URL in your input")
} else {
  const url = matches[0]
  const nqn_regex = /https:\/\/nqn.blue\/packs\/([a-zA-Z0-9]+)/
  const nqn_matches = url.match(nqn_regex)
  if (nqn_matches === null) {
    console.log("This is not a valid nqn emoji pack URL")
  } else {
    const pack_id = nqn_matches[1]
    console.log(pack_id)
    ;(async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext({})
      const page = await context.newPage()

      try {
        await page.goto(url, {
          waitUntil: "networkidle"
        })
        const imgSrcs = await page.$$eval("img", (images) => {
          return images.map((img) => img.getAttribute("src"))
        })
        const gifEmojiPreviewURL = []
        const pngEmojiPreviewURL = []
        const format_regex =
          /http[s]:\/\/cdn.discordapp.com\/emojis\/([a-zA-Z0-9]+).([a-z]+)\?(:?[a-zA-Z0-9=]+)/

        // console.log(imgSrcs);
        for (const imgSrc of imgSrcs) {
          const png_Regex =
            /http[s]:\/\/cdn.discordapp.com\/emojis\/([a-zA-Z0-9]+).(png)\?(:?[a-zA-Z0-9=]+)/
          const gif_Regex =
            /http[s]:\/\/cdn.discordapp.com\/emojis\/([a-zA-Z0-9]+).(gif)\?(:?[a-zA-Z0-9=]+)/
          if (imgSrc.match(png_Regex)) {
            pngEmojiPreviewURL.push(imgSrc)
          }
          if (imgSrc.match(gif_Regex)) {
            gifEmojiPreviewURL.push(imgSrc)
          }
        }
        console.log(gifEmojiPreviewURL)
        console.log(pngEmojiPreviewURL)

        // selector for urgent use
        // const buttonElement = await page.waitForSelector(
        //   "div.ui.fluid.vertical.buttons button.ui.secondary.button"
        // );

        // await page.getByText("Download all emojis as zip").click();
        // const downloadPromise = page.waitForEvent("download");
        // const download = await downloadPromise;
        // // Wait for the download process to complete
        // console.log(await download.path());
        // // Save downloaded file somewhere
        // await download.saveAs(`./${pack_id}.zip`);
      } catch (error) {
        console.log(error)
      }

      await browser.close()
    })()
  }
}
