
<template>
  <div class="molecule-color-texture">
    <div class="color-texture__preview" :style="style">
      <div ref="preview">
        <atom-preview style-type="color-texture" v-bind="previewData" />
      </div>
    </div>
    <molecule-form v-model="model" :buttons="buttons" :inputs="inputs" class="molecule-color-texture" @submit="$emit('submit', $event)" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ipoint } from '@js-basics/vector';
import { blobToObjectUrl } from '@@/src/utils/blob';
import ColorTexture from '@@/src/classes/ColorTexture';
import { ALIGNMENT } from '@@/src/utils/face';
import AtomPreview from '@/components/atoms/Preview';
import MoleculeForm from '@/components/molecules/Form';
import AtomInputText from '@/components/atoms/input/Text';
import AtomInputColor from '@/components/atoms/input/Color';
import AtomInputTexture from '@/components/atoms/input/Texture';

import Face from '@/classes/renderType/Face';

export default {
  components: { AtomPreview, MoleculeForm },
  props: {
    value: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      textureSrc: null,
      model: Object.assign({}, this.value),
      previewData: {
        // eslint-disable-next-line no-secrets/no-secrets
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        size: ipoint(0, 0)
      },
      buttons: [
        {
          width: 1,
          options: {
            styleType: 'form',
            tag: 'button',
            label: 'Apply'
          }
        }
      ],
      inputs: [
        {
          width: 1,
          component: AtomInputColor,
          name: 'color',
          default: this.value.color || '#ff0000',
          options: {
            label: 'Color'
          }
        },
        {
          width: 1 / 2,
          component: AtomInputTexture,
          name: 'textureSrc',
          default: this.value.textureSrc,
          options: {
            label: 'Texture'
          }
        },
        {
          width: 1 / 2,
          component: AtomInputText,
          name: 'textureScale',
          default: this.value.textureScale || '1',
          options: {
            type: 'number',
            label: 'Texture Scale',
            required: true,
            step: 0.01,
            min: 0
          },
          validation: (model, value) => {
            const invalids = [];
            (Number(value) <= 0) && invalids.push('Scaling must be greater than 0.');
            return invalids;
          }
        }
      ],
      renderTyoe: new Face()
    };
  },
  computed: {
    style () {
      if (this.model) {
        return {
          '--color': this.model.color || 'transparent',
          '--texture-src': this.model.textureSrc && `url(${this.model.textureSrc})`,
          '--texture-scale': (this.model && Number(this.model.textureScale)) || 1
        };
      }
      return {};
    }
  },
  watch: {
    model: {
      handler () {
        this.render();
      },
      deep: true
    }
  },
  mounted () {
    this.render();
  },
  methods: {
    render () {
      global.clearTimeout(this.renderTimeout);
      this.renderTimeout = global.setTimeout(async () => {
        const { width, height } = this.$refs.preview.getBoundingClientRect();
        this.previewData = {
          src: await this.renderTyoe.draw({ width, height, scale: () => 1 }, {
            alignment: [() => ALIGNMENT.LEFT, () => ALIGNMENT.TOP, () => ALIGNMENT.RIGHT, () => ALIGNMENT.BOTTOM],
            color: [() => new ColorTexture(this.model)],
            eyeLeft: () => 2,
            eyeRight: () => 2,
            mouth: () => 2
          }).toDataURL(),
          size: ipoint(width, height)
        };
      }, 500);
    }
  }
};
</script>

<style lang="postcss" scoped>
.molecule-color-texture {
  & .color-texture__preview {
    padding-bottom: calc(15 / 16 * 1rem);
    margin: calc(5 / 16 * 1rem);
    margin-bottom: calc(10 / 16 * 1rem);
    border-bottom: solid var(--color-light-grey) 1px;

    & > div {
      position: relative;
      padding-top: calc(128 / 16 * 1rem);
      background: url("@/assets/grid.png");
      border: solid var(--color-light-grey) 1px;

      & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        /* background: var(--color);
        background-image: var(--texture-src);
        background-position: center;
        background-size: auto calc(var(--texture-scale) * 100%); */
        box-shadow: inset 0 0 calc(10 / 16 * 1rem) rgb(0 0 0 / 50%);

        & img {
          object-fit: contain;
        }
      }
    }
  }
}
</style>
