const gb2260 = require('./gb2260')

function getProvinces() {
  return Object.keys(gb2260)
    .map(code => new Division(code))
    .filter(division => division.isProvince)
}

function isProvince(code) {
  return (Number(code) % 10_000) === 0
}

function isPrefecture(code) {
  return (Number(code) % 100) === 0 && !isProvince(code)
}

function isCounty(code) {
  return (Number(code) % 100) > 0
}

class Division {
  constructor(code) {
    this.code = Number(code)
    this.name = gb2260[code]

    this.isProvince   = isProvince(code)
    this.isPrefecture = isPrefecture(code)
    this.isCounty     = isCounty(code)

    if (this.isProvince)   { this.type = 'province' }
    if (this.isPrefecture) { this.type = 'prefecture' }
    if (this.isCounty)     { this.type = 'county' }
  }

  getParent() {
    if (this.isPrefecture) {
      return new Division(~~(this.code / 10_000) * 10_000)
    }

    if (this.isCounty) {
      return new Division(~~(this.code / 100) * 100)
    }

    return null
  }

  getChildren() {
    return Object.keys(gb2260)
      .map(code => new Division(code))
      .filter(division => division.getParent()?.code === this.code)
  }

  toTree(...args) {
    return {
      ...this.toJS(),
      contents: this.code === args.shift()
        ? this.getChildren().map(division => division.toTree(...args))
        : []
    }
  }

  toJS() {
    return {
      code: this.code,
      name: this.name,
      type: this.type || 'unknown'
    }
  }
}

module.exports = {
  getProvinces,
  Division
}
