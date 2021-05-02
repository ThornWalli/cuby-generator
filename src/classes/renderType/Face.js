import RenderType from '@/classes/RenderType';
import { COLORS, getBrightnessByColor } from '@@/src/utils/color';
import { createFace } from '@@/src/utils/face';
import SvgControlsTypeFace from '@/assets/svg/controls/controls_type_face.svg?vue-template';
import SvgControlsColor from '@/assets/svg/controls/controls_color.svg?vue-template';
import SvgControlsScale from '@/assets/svg/controls/controls_scale.svg?vue-template';
import { MODE } from '../AssetManager';
import { getProperty } from './properties';

export default class Face extends RenderType {
    name = 'Face'
    icon = SvgControlsTypeFace
    props = [
      getProperty('color', 'color', 'Color', { icon: SvgControlsColor, default: [COLORS[0]] }),
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
      color, scale,
      eyeLeft, eyeRight, mouth
    }) {
      this.setSize(width, height);
      color = color[0];

      const context = this.context;

      const size = Math.round((height > width ? width : height) * scale());

      color = color();
      const face = createFace({
        eyeLeft: eyeLeft(),
        eyeRight: eyeRight(),
        mouth: mouth(),
        mode,
        size,
        invert: mode === MODE.ALPHA && getBrightnessByColor(color) / 255 < 0.5
      });

      context.fillStyle = color;
      context.fillRect(0, 0, width, height);

      context.drawImage(face, (width - size) / 2, (height - size) / 2, size, size);

      return this.canvas;
    }
}
