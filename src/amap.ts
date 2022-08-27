import axios from 'axios'

export const restapi = axios.create({
  baseURL: 'https://restapi.amap.com/v3',
  params: {
    key: process.env.AMAP_API_KEY
  }
})

export async function regeo(latitude: string, longitude: string) {
  const { data } = await restapi.get('/geocode/regeo', {
    params: {
      location: `${latitude},${longitude}`
    }
  })

  return data.regeocode?.addressComponent
}
