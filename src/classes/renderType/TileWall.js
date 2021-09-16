import RenderType from '@/classes/RenderType';
import { COLORS } from '@/utils/color';
import { getBrightnessByColor } from '@@/src/utils/color';
import { createFace } from '@@/src/utils/face';
import SvgControlsTypeTileWall from '@/assets/svg/controls/controls_type_tile_wall.svg?vue-template';
import SvgControlsColor from '@/assets/svg/controls/controls_color.svg?vue-template';
import SvgControlsOffset from '@/assets/svg/controls/controls_offset.svg?vue-template';
import { ipoint } from '@js-basics/vector';
import { createPattern } from '@@/src/utils/canvas';
import { MODE } from '../AssetManager';
import ColorTexture from '../ColorTexture';
import { getProperty } from './properties';

export default class TileWall extends RenderType {
    name = 'Tile Wall'
    icon = SvgControlsTypeTileWall
    props = [
      getProperty('color', 'color', 'Color A/B', {
        default: [new ColorTexture({ color: COLORS[6] }), new ColorTexture({ color: COLORS[7] })],
        icon: SvgControlsColor,
        options: {
          count: 2
        }
      }),
      getProperty('dimension', 'relativeOffset', 'Offset', {
        availableViews: ['seed'],
        icon: SvgControlsOffset,
        default: ipoint(0, 0),
        options: {
          step: 0.25,
          min: -1,
          max: 1
        }
      })
    ]

    draw ({ width, height, mode, scale }, {
      color: colorTexture,
      eyeLeft, eyeRight, mouth,
      relativeOffset
    }) {
      this.setSize(width, height);
      let [colorTextureA, colorTextureB] = colorTexture;

      colorTextureA = colorTextureA || (() => new ColorTexture({ color: 'transparent' }));
      colorTextureB = colorTextureB || (() => new ColorTexture({ color: 'transparent' }));

      const { x: relativeOffsetX, y: relativeOffsetY } = relativeOffset();
      const context = this.context;

      const size = Math.round(128 * scale());
      const cols = Math.ceil(width / size);
      const rows = Math.ceil(height / size) + 2;
      const offsetX = Math.round(((cols * size) - width) / 2);
      const offsetY = Math.round(((rows * size) - height) / 2);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let offsetY_ = offsetY;
          let offsetX_ = offsetX;
          if (x % 2 === 0) {
            offsetY_ += size * relativeOffsetY;
          }
          if (y % 2 === 0) {
            offsetX_ += size * relativeOffsetX;
          }

          colorTexture = x % 2 + y % 2 === 1 ? colorTextureA() : colorTextureB();
          const face = createFace({
            eyeLeft: eyeLeft(),
            eyeRight: eyeRight(),
            mouth: mouth(),
            mode,
            size,
            invert: mode === MODE.ALPHA && ((getBrightnessByColor(colorTexture.color) / 255) < 0.3)
          });

          context.fillStyle = colorTexture.color;
          context.fillRect(x * size - offsetX_, y * size - offsetY_, size, size);

          if (colorTexture.textureSrc) {
            // const pattern = context.createPattern(urlToImage(colorTexture.textureSrc), 'repeat'); // Create a pattern with this image, and set it to "repeat".
            // eslint-disable-next-line no-unused-vars
            const { pattern, offset } = createPattern(colorTexture, { width: size, height: size });
            context.fillStyle = pattern;

            context.translate(offset[0], offset[1]);

            context.fillRect(x * size - offsetX_ - offset[0], y * size - offsetY_ - offset[1], size, size);

            context.translate(-1 * offset[0], -1 * offset[1]);
          }

          context.drawImage(face, x * size - offsetX_, y * size - offsetY_, size, size);
        }
      }

      return this.canvas;
    }
}
