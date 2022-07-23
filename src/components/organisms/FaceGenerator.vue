
<template>
  <div class="face-generator" :class="{'js--wait': renderTimeout}">
    <atom-preview v-if="hasPreview" class="face-generator__preview" v-bind="previewData" />

    <div class="face-generator__controls face-generator__controls--left-bottom face-generator__properties">
      <span class="separator" />
      <slot name="controlsBefore" />
      <molecule-property
        v-for="input in preparedInputs"
        :key="input.name"
        :icon="input.icon"
        :component="input.component"
        :options="input.options"
        :label="input.label"
        :value="model[input.name]"
        @input="onInput(input,$event)"
      />

      <slot name="controlsAfter" />
    </div>
    <div class="face-generator__controls face-generator__controls--left-top">
      <atom-base-button tag="a" :href="previewData.src" :download="`${filename}.png`">
        Download
      </atom-base-button>
    </div>
    <div v-if="showSharing" class="face-generator__controls face-generator__controls--right-bottom">
      <atom-base-button tag="button" @click="onClickShare">
        Share
      </atom-base-button>
    </div>

    <div class="face-generator__controls face-generator__controls--right-top">
      <slot name="controlsRightTop" />
    </div>
  </div>
</template>
<script>

import { IPoint, ipoint } from '@js-basics/vector';
import ColorTexture from '@@/src/classes/ColorTexture';
import { MODE } from '../../classes/AssetManager';
import { getProperty } from '../../classes/renderType/properties';
import { urlToBlob } from '../../utils/blob';
import assetManager from '@/services/assetManager';

import AtomPreview from '@/components/atoms/Preview';
import AtomBaseButton from '@/components/atoms/BaseButton';
import MoleculeProperty from '@/components/molecules/Property';

import Face from '@/classes/renderType/Face';
import TileWall from '@/classes/renderType/TileWall';

import SvgControlsDimension from '@/assets/svg/controls/controls_dimension.svg?vue-template';
import SvgControlsMode from '@/assets/svg/controls/controls_mode.svg?vue-template';
import SvgControlsModeColor from '@/assets/svg/controls/controls_mode_color.svg?vue-template';
import SvgControlsModeAlpha from '@/assets/svg/controls/controls_mode_alpha.svg?vue-template';
import SvgControlsScale from '@/assets/svg/controls/controls_scale.svg?vue-template';

import SvgControlsType from '@/assets/svg/controls/controls_type.svg?vue-template';

export default {
  components: { AtomPreview, AtomBaseButton, MoleculeProperty },
  props: {
    hasPreview: {
      type: Boolean,
      default: true
    },
    modelExtend: {
      type: Object,
      default () {
        return {};
      }
    },
    filename: {
      type: String,
      default: 'image'
    },
    inputFilter: {
      type: String,
      default: null
    },
    inputs: {
      type: Array,
      default () {
        return [];
      }
    },
    overrideConfig: {
      type: [Function, Object],
      default () {
        return {};
      }
    }
  },

  data () {
    const renderTypes = [new Face(), new TileWall()];
    return {
      showSharing: !!global.navigator.share,
      screen,
      model: Object.assign(this.getModel(renderTypes), this.modelExtend),
      currentRenderType: null,
      renderTimeout: null,
      renderFn: null,
      renderTypes,
      previewData: {
        // eslint-disable-next-line no-secrets/no-secrets
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        size: ipoint(0, 0)
      },
      preparedInputs: []
    };
  },

  computed: {

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
    inputs () {
      this.applyInputs();
    },
    'model.renderType': {
      async handler (name) {
        if (this.renderTypes) {
          await assetManager.ready;
          this.currentRenderType = this.renderTypes.find(renderType => renderType.name === name);
          this.applyInputs();
          this.render();
          this.$emit('renderType', this.currentRenderType);
        }
      },
      immediate: true
    }
  },

  async mounted () {
    await assetManager.setup();
  },

  methods: {
    onInput (input, e) {
      this.model[input.name] = e;
      this.render();
      this.updateRoute();
      this.$emit('modelChange', this.model);
    },
    getInputs () {
      const modeIcons = {
        [MODE.COLOR]: SvgControlsModeColor,
        [MODE.ALPHA]: SvgControlsModeAlpha
      };
      return [
        getProperty('dimension', 'dimension', 'Dimension', {
          icon: SvgControlsDimension,
          availableViews: ['seed'],
          options: { showRatioLocked: true, showApplyScreen: true }
        }),
        getProperty('items', 'mode', 'Mode', {
          icon: SvgControlsMode,
          availableViews: ['seed'],
          options: {
            items: Object.entries(MODE).map(([label, value]) => {
              return {
                component: modeIcons[String(value)],
                label,
                value
              };
            })
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
        }),
        getProperty('items', 'renderType', 'RenderType', {
          icon: SvgControlsType,
          availableViews: ['seed'],
          options: {
            items: this.renderTypes.map((type) => {
              return {
                component: type.icon,
                label: type.name,
                value: type.name
              };
            })
          }
        })

      ];
    },

    applyInputs () {
      this.preparedInputs = [
        ...this.getInputs(),
        ...this.inputs.filter(input => !this.inputFilter || (this.inputFilter && input.availableViews.includes(this.inputFilter))),
        ...this.currentRenderType.props
      ]
        .filter(input => !this.inputFilter || (this.inputFilter && (input.availableViews || []).includes(this.inputFilter)))
        .map((input) => {
          if (input.type === 'dimension') {
            if (this.$route.query[input.name] && !this.model[input.name]) {
              this.model[input.name] = ipoint(...this.$route.query[input.name]);
            } else if (input.name === 'dimension' && !this.model[input.name]) {
              this.model[input.name] = getScreenDimension();
            } else {
              this.model[input.name] = this.model[input.name] || ipoint(...input.default);
            }
          } else if (input.type === 'color') {
            this.model[input.name] = [].concat(this.$route.query[input.name] || this.model[input.name] || input.default).map((color) => {
              if (color instanceof ColorTexture) {
                return color;
              } else {
                return new ColorTexture({ color });
              }
            });
          } else {
            this.model[input.name] = this.model[input.name] || this.$route.query[input.name] || input.default;
          }
          return Object.assign({}, input);
        });
    },

    getModel (renderTypes) {
      const renderType = (renderTypes.find(({ name }) => name === this.$route.query.renderType) && this.$route.query.renderType) || renderTypes[0].name;

      const mode = (Object.values(MODE).includes(this.$route.query.mode) && this.$route.query.mode) || MODE.COLOR;

      return {
        renderType,
        mode,
        scale: parseFloat(this.$route.query.scale) || 1
      };
    },
    async onClickShare () {
      const title = 'Cuby Generator';
      const text = 'Create your Cuby image on https://cuby.lammpee.de';
      const filesArray = [new File([await urlToBlob(this.previewData.src)], `${Date.now()}_cuby.png`, { type: 'image/png' })];
      if (global.navigator.canShare && global.navigator.canShare({ files: filesArray })) {
        global.navigator.share({
          files: filesArray,
          title,
          text
        });
      } if (global.navigator.share) {
        global.navigator.share({
          title,
          text,
          url: global.location.href
        });
      } else {
        alert('Your system doesn\'t support sharing files.');
      }
    },
    updateRoute () {
      global.setTimeout(() => {
        this.$router.replace({
          query: Object.assign({}, this.$route.query, Object.fromEntries(Object.entries(this.model).map(([key, value]) => {
            if (value instanceof IPoint) {
              value = [value.x, value.y];
            }
            if (Array.isArray(value)) {
              value = value.map((value) => {
                if (value instanceof ColorTexture) {
                  return value.color;
                }
                return value;
              });
            }
            return [key, value];
          })))
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
          const { x: width, y: height } = this.model.dimension;
          const { scale, mode } = this.model;
          const model = Object.assign(Object.keys(this.model).reduce((result, key) => {
            if (typeof this.model[String(key)] === 'function') {
              result[String(key)] = this.model[String(key)];
            } else if (Array.isArray(this.model[String(key)])) {
              result[String(key)] = this.model[String(key)].map((value) => {
                if (typeof this.model[String(key)] === 'function') {
                  return value;
                } else {
                  return () => value;
                }
              });
            } else {
              result[String(key)] = () => this.model[String(key)];
            }
            return result;
          }, {}), this.overrideConfig());
          this.setPreview({
            src: this.currentRenderType.draw({ width, height, scale: () => scale, mode }, model).toDataURL(),
            size: ipoint(width, height)
          });
          this.renderTimeout = null;
        }, 300);
      }
    }

  }
};

function getScreenDimension () {
  const screen = global.screen;
  let dimension = ipoint(window.innerWidth, window.innerHeight);
  if (screen) {
    dimension = ipoint(screen.width, screen.height);
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

    &.face-generator__controls--right-bottom {
      right: calc(20 / 16 * 1rem);
      bottom: calc(20 / 16 * 1rem);
    }
  }
}

</style>
