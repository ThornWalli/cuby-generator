
export const COLORS = [
  '#ff1d25',
  '#f15a24',
  '#ffd226',
  '#8cc63f',
  '#0066ff',
  '#93278f',
  '#ffffff',
  '#000000'
];

/**
 * Calculate brightness value by RGB or HEX color.
 * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
 * @returns (Number) The brightness value (dark) 0 ... 255 (light)
 */
export function getBrightnessByColor (color) {
  color = '' + color; const isHEX = color.indexOf('#') === 0; const isRGB = color.indexOf('rgb') === 0;
  let r, g, b;
  if (isHEX) {
    const hasFullSpec = color.length === 7;
    const m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m) { r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16); g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16); b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16); }
  }
  if (isRGB) {
    const m = color.match(/(\d+){3}/g);
    if (m) { r = m[0]; g = m[1]; b = m[2]; }
  }
  if (typeof r !== 'undefined') { return ((r * 299) + (g * 587) + (b * 114)) / 1000; }
}
