import symbolToIsoCodeMap from './symbol-to-iso-codes-map.json'

const dashRegex = /-/

export function mapSymbolToIsoCode (symbol, locale) {
  const split = locale.split(dashRegex)
  const countryCode = split[split.length === 1 ? 0 : 1].toUpperCase()
  const result = symbolToIsoCodeMap[symbol]
  if (typeof result === 'string') {
    return result
  }
  for (const isoCode of result.isoCodes) {
    if (isoCode.substring(0, 2) === countryCode) {
      return isoCode
    }
  }
  return result.defaultIsoCode
}