import { COLORS, getBrightnessByColor } from '@@/src/utils/color';
import { ALIGNMENT, ALIGNMENT_ICONS, createFace } from '@@/src/utils/face';
import { urlToImage } from '@@/src/utils/blob';
import { ipoint } from '@js-basics/vector';
import { MODE } from '../AssetManager';
import ColorTexture from '../ColorTexture';
import { getProperty } from './properties';
import SvgControlsAlign from '@/assets/svg/controls/controls_align.svg?vue-template';
import SvgControlsOffset from '@/assets/svg/controls/controls_offset.svg?vue-template';
import SvgControlsColor from '@/assets/svg/controls/controls_color.svg?vue-template';
import SvgControlsTypeFace from '@/assets/svg/controls/controls_type_face.svg?vue-template';
import RenderType from '@/classes/RenderType';

export default class Face extends RenderType {
  name = 'Face';
  icon = SvgControlsTypeFace;
  props = [
    getProperty('dimension', 'relativeOffset', 'Offset', {
      availableViews: ['seed'],
      icon: SvgControlsOffset,
      default: ipoint(0, 0),
      options: {
        step: 0.25,
        min: -1,
        max: 1
      }
    }),
    getProperty('items', 'alignment', 'Alignment', {
      icon: SvgControlsAlign,
      default: [ALIGNMENT.LEFT, ALIGNMENT.TOP, ALIGNMENT.RIGHT, ALIGNMENT.BOTTOM],
      options: {
        multiple: true,
        items: Object.keys(ALIGNMENT).map(align => ({
          label: `Alignment ${align.toLocaleLowerCase()}`,
          value: ALIGNMENT[String(align)],
          imageSrc: ALIGNMENT_ICONS[ALIGNMENT[String(align)]]
        }))
      }
    }),

    getProperty('color', 'color', 'Color', { icon: SvgControlsColor, default: [new ColorTexture({ color: COLORS[4] })] })
  ];

  draw ({ width, height, mode, scale }, {
    color: colorTexture, eyeLeft, eyeRight, mouth,
    alignment, relativeOffset
  }) {
    width = Number(width);
    height = Number(height);

    this.setSize(width, height);
    colorTexture = colorTexture[0];

    const context = this.context;
    const size = Math.round((height > width ? width : height) * scale());
    const face = createFace({
      eyeLeft: eyeLeft(),
      eyeRight: eyeRight(),
      mouth: mouth(),
      mode,
      size,
      invert: mode === MODE.ALPHA && ((getBrightnessByColor(colorTexture.color) / 255) < 0.3)
    });

    colorTexture = colorTexture();
    context.fillStyle = colorTexture.color;
    context.fillRect(0, 0, width, height);

    if (colorTexture.textureSrc) {
      // const pattern = context.createPattern(urlToImage(colorTexture.textureSrc), 'repeat'); // Create a pattern with this image, and set it to "repeat".
      // eslint-disable-next-line no-unused-vars
      const { pattern, offset } = createPattern(colorTexture, { width, height });
      context.fillStyle = pattern;

      context.translate(offset[0], offset[1]);

      context.fillRect(offset[0], offset[1], width + Math.abs(offset[0]) * 2, height + Math.abs(offset[1]) * 2);

      context.translate(-1 * offset[0], -1 * offset[1]);
    }

    let x = 0;
    let y = 0;
    if (alignment) {
      alignment = alignment.map(align => align());
      if (alignment.includes(ALIGNMENT.LEFT) && alignment.includes(ALIGNMENT.RIGHT)) {
        x = (width - size) / 2;
      }
      if (!alignment.includes(ALIGNMENT.LEFT) && alignment.includes(ALIGNMENT.RIGHT)) {
        x = width - size;
      }
      if (alignment.includes(ALIGNMENT.TOP) && alignment.includes(ALIGNMENT.BOTTOM)) {
        y = (height - size) / 2;
      }
      if (!alignment.includes(ALIGNMENT.TOP) && alignment.includes(ALIGNMENT.BOTTOM)) {
        y = height - size;
      }
      if (relativeOffset) {
        const { x: relativeOffsetX, y: relativeOffsetY } = relativeOffset();
        x += size * relativeOffsetX;
        y += size * relativeOffsetY;
      }
    }

    context.drawImage(face, x, y, size, size);

    return this.canvas;
  }
}

function createPattern (colorTexture, { width, height }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const patternImg = urlToImage(colorTexture.textureSrc);
  canvas.width = height * (patternImg.naturalWidth / patternImg.naturalHeight) * colorTexture.textureScale;
  canvas.height = height * colorTexture.textureScale;
  context.drawImage(patternImg, 0, 0, canvas.width, canvas.height);
  return {
    pattern: context.createPattern(canvas, 'repeat'),
    offset: [
      (width - Math.ceil(width / canvas.width) * canvas.width) / 2,
      (height - Math.ceil(height / canvas.height) * canvas.height) / 2
    ]
  };
}
