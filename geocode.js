const axios = require('axios')
const baseURL = 'https://restapi.amap.com/v3'

async function regeo(...latlng) {
  const { data } = await axios.get('/geocode/regeo', {
    baseURL,
    params: {
      key: process.env.AMAP_API_KEY,
      location: latlng.join(',')
    }
  })

  return data.regeocode?.addressComponent
}

module.exports = { regeo }
