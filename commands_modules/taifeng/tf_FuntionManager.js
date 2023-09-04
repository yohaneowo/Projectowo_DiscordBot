const puppeteer = require("puppeteer")
const axios = require("axios")

class TaiFeng_FunctionManager {
  async getTaiFengscreenshot(url, path) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.screenshot({ path: path })
    await browser.close()
  }

  async getTaiFengMessage() {
    axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0034-005?Authorization=CWB-044E20C5-733F-4552-A73B-F4602A973223"
      )
      .then(function (response) {
        // handle success
        // console.log(response.data)
        const response_data = response.data
        return response_data
      })
  }
}

module.exports = TaiFeng_FunctionManager
