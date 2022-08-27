import type { Code } from './division'
import { Division } from './division'
import { gb2260 } from './dataset'

function getCodes(division: Division) {
  if (division.isProvince) {
    return [division.code]
  }

  if (division.isPrefecture) {
    const province = division.getParent()
    return [province.code, division.code]
  }

  return []
}

export function getProvinces() {
  return Object.keys(gb2260)
    .map(code => new Division(code))
    .filter(division => division.isProvince)
}

export function getDivision(code: Code) {
  const division = new Division(code)
  return division.isProvince || division.isPrefecture || division.isCounty
    ? division.toJS()
    : null
}

export function getTree(code?: Code) {
  const division = new Division(code)
  const provinces = getProvinces()
  const codes = getCodes(division)

  return provinces.map(division => division.toTree(...codes))
}

//     const division = new Division(data?.adcode)
