import tinycolor from 'tinycolor2'

/**
 * Verify value is HEX
 * @param hex
 * @returns
 */
export function isValidHex(hex: any) {
  return tinycolor(hex).isValid()
}

/**
 * Verify value is transparent
 * @param color
 * @returns
 */
export function isTransparent(color: any) {
  return tinycolor(color).getAlpha() === 0
}

/**
 * palette to upperCase
 * @param palette
 * @returns
 */
export function paletteToUpperCase(palette: string[]) {
  return palette.map(c => c.toUpperCase())
}
