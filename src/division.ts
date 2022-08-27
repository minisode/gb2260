import { gb2260 } from './dataset'

function isProvince(code: number) {
  return code % 10_000 === 0
}

function isPrefecture(code: number) {
  return code % 100 === 0 && !isProvince(code)
}

function isCounty(code: number) {
  return code % 100 > 0
}

function kindOf(division: Division) {
  if (division.isProvince)   { return 'province' }
  if (division.isPrefecture) { return 'prefecture' }
  if (division.isCounty)     { return 'county' }

  return 'unknown'
}

export type Code = string | number

export class Division {
  readonly code: number
  readonly name: string
  readonly type: string
  readonly isProvince: boolean
  readonly isPrefecture: boolean
  readonly isCounty: boolean

  constructor(code: Code) {
    this.code = Number(code)
    this.name = gb2260[code]
    this.type = kindOf(this)
    this.isProvince = isProvince(this.code)
    this.isPrefecture = isPrefecture(this.code)
    this.isCounty = isCounty(this.code)
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
      .map((code) => new Division(code))
      .filter((division) => division.getParent()?.code === this.code)
  }

  toTree(...args: number[]) {
    return {
      ...this.toJS(),
      contents:
        this.code === args.shift()
          ? this.getChildren().map((division) => division.toTree(...args))
          : []
    }
  }

  toJS() {
    return {
      code: this.code,
      name: this.name,
      type: this.type
    }
  }
}
