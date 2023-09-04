const axios = require("axios")

axios
  .get(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/W-C0034-005?Authorization=CWB-044E20C5-733F-4552-A73B-F4602A973223"
  )
  .then(function (response) {
    // handle success
    console.log(response.data)
    const final = response.data
    console.log(
      final.records.tropicalCyclones.tropicalCyclone[0].cwbTyphoonName
    )
    console.log(final.records.tropicalCyclones.tropicalCyclone[0].year)
    console.log(
      final.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix[0]
    )
    console.log(
      final.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix.length
    )
    console.log(
      final.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix[78]
    )
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
  .then(function () {
    // always executed
  })
