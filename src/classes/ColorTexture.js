import { COLORS } from '../utils/color';

export default class ColorTexture {
  color = COLORS[4];
  textureScale = 1;
  textureSrc = null;
  constructor ({
    color,
    textureScale,
    textureSrc
  }) {
    this.color = color;
    this.textureScale = textureScale;
    this.textureSrc = textureSrc;
  }
}
