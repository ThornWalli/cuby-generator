import { TYPES } from '../classes/AssetManager';
import assetManager from '../services/assetManager';

export const ALIGNMENT = { LEFT: 'left', TOP: 'top', RIGHT: 'right', BOTTOM: 'bottom' };
export const ALIGNMENT_ICONS = {
  [ALIGNMENT.LEFT]: require('@/assets/svg/controls/controls_align_left.svg').default,
  [ALIGNMENT.TOP]: require('@/assets/svg/controls/controls_align_top.svg').default,
  [ALIGNMENT.RIGHT]: require('@/assets/svg/controls/controls_align_right.svg').default,
  [ALIGNMENT.BOTTOM]: require('@/assets/svg/controls/controls_align_bottom.svg').default
};

let canvas;
export function createFace ({
  invert, eyeLeft,
  eyeRight,
  mouth, mode, size = 128
}) {
  canvas = canvas || document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');

  context.drawImage(assetManager.get(TYPES.EYE_LEFT, eyeLeft, mode), 0, 0, size, size);
  context.drawImage(assetManager.get(TYPES.EYE_RIGHT, eyeRight, mode), 0, 0, size, size);
  context.drawImage(assetManager.get(TYPES.MOUTH, mouth, mode), 0, 0, size, size);

  if (invert) {
    const imageData = context.getImageData(0, 0, size, size);
    const pixels = imageData.data;

    for (let i = 0, n = pixels.length; i < n; i += 4) {
      pixels[Number(i)] = 255 - pixels[Number(i)];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }

    context.putImageData(imageData, 0, 0);
  }
  return canvas;
}
