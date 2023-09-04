const puppeteer = require("puppeteer")
const axios = require("axios")
require("dotenv").config()
class TaiFeng_FunctionManager {
  async getTaiFengScreenshot(url, path) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { timeout: 60000 })
    await page.screenshot({ path: path })
    await browser.close()
  }

  async getTaiFengMessage() {
    const apiUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0034-005?Authorization=${process.env.OPENDAT_CWB_GOV_TW}`
    // const param = {W
    //   Authorization: process.env.OPENDAT_CWB_GOV_TW
    // }
    try {
      const response = await axios.get(apiUrl)
      // console.log(response)
      // handle success
      // console.log(response.data)
      const response_data = response.data
      // console.log(response_data)
      return response_data
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = TaiFeng_FunctionManager
