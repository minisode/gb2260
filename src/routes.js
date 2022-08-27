const { Division, getProvinces } = require('./division')
const { regeo } = require('./geocode')

async function index(request, response) {
  const { code } = request.query
  const division = new Division(code)
  const data = getProvinces()
  const args = []

  if (division.isProvince) {
    args.push(division.code)
  }

  if (division.isPrefecture) {
    const province = division.getParent()
    args.push(province.code, division.code)
  }

  return response.json(data.map(division => division.toTree(...args)))
}

async function show(request, response) {
  const { code } = request.params
  const division = new Division(code)

  return (division.isProvince
       || division.isPrefecture
       || division.isCounty)
    ? response.json(division.toJS())
    : response.sendStatus(404)
}

async function latlng(request, response) {
  const { latitude, longitude } = request.params

  try {
    const data = await regeo(latitude, longitude)
    const division = new Division(data?.adcode)

    return response.json(division.toJS())
  } catch ({ message }) {
    return response.sendStatus(404)
  }
}

module.exports = {
  latlng,
  index,
  show
}
