import RenderType from '@/classes/RenderType';
import { COLORS } from '@/utils/color';
import { getBrightnessByColor } from '@@/src/utils/color';
import { createFace } from '@@/src/utils/face';
import SvgControlsTypeTileWall from '@/assets/svg/controls/controls_type_tile_wall.svg?vue-template';
import SvgControlsColor from '@/assets/svg/controls/controls_color.svg?vue-template';
import SvgControlsOffset from '@/assets/svg/controls/controls_offset.svg?vue-template';
import SvgControlsScale from '@/assets/svg/controls/controls_scale.svg?vue-template';
import { MODE } from '../AssetManager';
import { getProperty } from './properties';

export default class TileWall extends RenderType {
    name = 'Tile Wall'
    icon = SvgControlsTypeTileWall
    props = [
      getProperty('color', 'color', 'Color A/B', {
        default: [COLORS[6], COLORS[7]],
        icon: SvgControlsColor,
        options: {
          count: 2
        }
      }),
      getProperty('dimension', 'relativeOffset', 'Offset', {
        availableViews: ['seed'],
        icon: SvgControlsOffset,
        default: [0, 0],
        options: {
          step: 0.25,
          min: 0,
          max: 1
        }
      }),
      getProperty('number', 'scale', 'Scale', {
        icon: SvgControlsScale,
        availableViews: ['seed'],
        default: 1,
        options: {
          step: 0.1,
          min: 0,
          max: 10
        }
      })
    ]

    draw ({ width, height, mode }, {
      scale, color,
      eyeLeft, eyeRight, mouth,
      relativeOffset
    }) {
      this.setSize(width, height);
      let [colorA, colorB] = color;

      colorA = colorA || (() => 'transparent');
      colorB = colorB || (() => 'transparent');

      const [relativeOffsetX, relativeOffsetY] = relativeOffset;
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
            offsetY_ += size * relativeOffsetY();
          }
          if (y % 2 === 0) {
            offsetX_ += size * relativeOffsetX();
          }

          const color = x % 2 + y % 2 === 1 ? colorA() : colorB();
          const face = createFace({
            eyeLeft: eyeLeft(),
            eyeRight: eyeRight(),
            mouth: mouth(),
            mode,
            size,
            invert: mode === MODE.ALPHA && getBrightnessByColor(color) / 255 < 0.5
          });

          context.fillStyle = color;
          context.fillRect(x * size - offsetX_, y * size - offsetY_, size, size);

          context.drawImage(face, x * size - offsetX_, y * size - offsetY_, size, size);
        }
      }

      return this.canvas;
    }
}
