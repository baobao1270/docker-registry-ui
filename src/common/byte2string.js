export default class Byte2String {
  static binByte(number, precision = 2) {
    const UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
    const exponent = Math.min(Math.floor(Math.log(number) / Math.log(1024)), UNITS.length - 1)
    number /= 1024 ** exponent
    number = number.toPrecision(precision + 1)
    const unit = UNITS[exponent]
    return `${number} ${unit}`
  }

  static binBytePerSecond(number, precision = 2) {
    const size = this.binByte(number, precision)
    return `${size}/s`
  }
}
