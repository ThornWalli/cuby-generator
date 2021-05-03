<template>
  <div class="face-generator" :class="{'js--wait': renderTimeout}">
    <atom-preview v-if="hasPreview" class="face-generator__preview" v-bind="previewData" />

    <div class="face-generator__controls face-generator__controls--left-bottom face-generator__properties">
      <span class="separator" />
      <slot name="controlsBefore" />
      <molecule-property v-model="model.dimension" v-bind="propertyDimension" :value="model.dimension" />
      <molecule-property v-model="renderType" v-bind="propertyRenderType" :value="renderType" />
      <molecule-property v-model="model.mode" v-bind="propertyMode" :value="model.mode" />
      <molecule-property v-model="model.scale" v-bind="propertyScale" :value="model.scale" />
      <slot name="controlsAfter" />
    </div>
    <div class="face-generator__controls face-generator__controls--left-top">
      <atom-base-button tag="a" :href="previewData.src" :download="`${filename}.png`">
        Download
      </atom-base-button>
    </div>

    <div class="face-generator__controls face-generator__controls--right-top">
      <slot name="controlsRightTop" />
    </div>
  </div>
</template>
<script>
import assetManager from '@/services/assetManager';
import { COLORS } from '@/utils/color';
import { ipoint } from '@js-basics/vector';

import AtomPreview from '@/components/atoms/Preview';
import AtomBaseButton from '@/components/atoms/BaseButton';
import MoleculeProperty from '@/components/molecule/Property';

import Face from '@/classes/renderType/Face';
import TileWall from '@/classes/renderType/TileWall';
import ItemSelect from '@/components/molecule/property/ItemSelect';

import SvgControlsDimension from '@/assets/svg/controls/controls_dimension.svg?vue-template';
import SvgControlsMode from '@/assets/svg/controls/controls_mode.svg?vue-template';
import SvgControlsModeColor from '@/assets/svg/controls/controls_mode_color.svg?vue-template';
import SvgControlsModeAlpha from '@/assets/svg/controls/controls_mode_alpha.svg?vue-template';
import SvgControlsScale from '@/assets/svg/controls/controls_scale.svg?vue-template';

import SvgControlsType from '@/assets/svg/controls/controls_type.svg?vue-template';

import { MODE } from '../classes/AssetManager';
import { getProperty } from '../classes/renderType/properties';

export default {
  components: { AtomPreview, AtomBaseButton, MoleculeProperty },
  props: {
    hasPreview: {
      type: Boolean,
      default: true
    },
    config: {
      type: Function,
      default () {
        return {
          color: () => COLORS[0],
          face: () => [2, 2, 2]
        };
      }
    },
    filename: {
      type: String,
      default: 'image'
    }
  },
  data () {
    const renderTypes = [new Face(), new TileWall()];

    let dimension = getScreenDimension();
    if ('dimension' in this.$route.query) {
      dimension = this.$route.query.dimension.map(value => Number(value));
    }

    return {
      screen,
      model: {
        mode: this.$route.query.mode || MODE.COLOR,
        scale: 1,
        dimension
      },
      currentRenderType: null,
      renderTimeout: null,
      renderFn: null,
      renderType: this.$route.query.renderType || renderTypes[0].name,
      renderTypes,
      previewData: {
        // eslint-disable-next-line no-secrets/no-secrets
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        size: ipoint(0, 0)
      }
    };
  },
  computed: {

    propertyDimension () {
      return getProperty('dimension', 'dimension', 'Dimension', {
        icon: SvgControlsDimension,
        options: { showRatioLocked: true, showApplyScreen: true }
      });
    },

    propertyMode () {
      const icons = {
        [MODE.COLOR]: SvgControlsModeColor,
        [MODE.ALPHA]: SvgControlsModeAlpha
      };
      return {
        icon: SvgControlsMode,
        component: ItemSelect,
        options: {
          items: Object.entries(MODE).map(([label, value]) => {
            return {
              component: icons[String(value)],
              label,
              value
            };
          })
        }
      };
    },

    propertyScale () {
      return getProperty('number', 'scale', 'Scale', {
        icon: SvgControlsScale,
        availableViews: ['seed'],
        default: 1,
        options: {
          step: 0.1,
          min: 0,
          max: 10
        }
      });
    },

    propertyRenderType () {
      return {
        icon: SvgControlsType,
        component: ItemSelect,
        options: {
          items: this.renderTypes.map((type) => {
            return {
              component: type.icon,
              label: type.name,
              value: type.name
            };
          })
        }
      };
    },

    modeOptions () {
      return Object.entries(MODE).map(([label, value]) => {
        return {
          label,
          value
        };
      });
    },
    renderTypeOptions () {
      return this.renderTypes.map((type) => {
        return {
          label: type.name,
          value: type.name
        };
      });
    }
  },
  watch: {
    model: {
      handler (model) {
        this.render();
        this.updateRoute();
      },
      deep: true
    },
    renderType: {
      async handler (name, lastValue) {
        await assetManager.ready;
        this.updateRoute();

        this.currentRenderType = this.renderTypes.find(renderType => renderType.name === name);
        this.render();
        this.$emit('renderType', this.currentRenderType);
      },
      immediate: true
    }
  },
  async mounted () {
    await assetManager.setup();
  },
  methods: {
    updateRoute () {
      global.setTimeout(() => {
        this.$router.replace({
          query: Object.assign({}, this.$route.query, this.model, {
            renderType: this.renderType
          })
        });
      }, 0);
    },
    setPreview (data) {
      this.previewData = data;
      this.$emit('previewData', data);
    },
    getProp (name) {
      return this[String(name)];
    },
    render () {
      if (this.currentRenderType) {
        global.clearTimeout(this.renderTimeout);
        this.renderTimeout = global.setTimeout(() => {
          const [width, height] = this.model.dimension;
          const { scale, mode } = this.model;
          this.setPreview({
            src: this.currentRenderType.draw({ width, height, scale: () => scale, mode }, this.config()).toDataURL(),
            size: ipoint(width, height)
          });
          this.renderTimeout = null;
        }, 500);
      }
    }

  }
};

function getScreenDimension () {
  const screen = global.screen;
  let dimension = [window.innerWidth, window.innerHeight];
  if (screen) {
    dimension = [screen.width, screen.height];
  }
  return dimension;
}

</script>

<style lang="postcss" scoped>
.face-generator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & .face-generator__preview {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
  }

  &.js--wait {
    & .face-generator__preview {
      transform: scale(1.1);
    }
  }

  & .face-generator__controls {
    position: absolute;
    display: flex;
    flex-direction: column;

    &.face-generator__controls--left-bottom {
      right: calc(20 / 16 * 1rem);
      bottom: calc(20 / 16 * 1rem);
      left: calc(20 / 16 * 1rem);
      display: flex;
      align-items: flex-start;
    }

    &.face-generator__controls--right-top {
      top: calc(20 / 16 * 1rem);
      right: calc(20 / 16 * 1rem);
      display: flex;
      align-items: center;
    }

    &.face-generator__controls--left-top {
      top: calc(20 / 16 * 1rem);
      left: calc(20 / 16 * 1rem);
    }
  }
}

</style>
