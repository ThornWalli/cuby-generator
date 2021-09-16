<template>
  <div>
    <transition name="fade">
      <div v-if="active" class="molecule-property-color-select">
        <molecule-dialog v-for="(item, index) in colors" ref="dialog" :key="index" title="Colors &amp; Textures">
          <template #helper="{show}">
            <button :style="getStyle(value[index])" class="property-color-select__preview" @click="onClick(index, show)">
              <div />
            </button>
            <icon-button @click="onClickRandomColor(index)">
              <svg-icon-refresh />
            </icon-button>
          </template>
          <template #default="{close}">
            <molecule-color-texture :value="value[index]" @submit="close($event)" />
          </template>
        </molecule-dialog>
      </div>
    </transition>
  </div>
</template>

<script>
import IconButton from '@/components/atoms/IconButton';
import SvgIconRefresh from '@/assets/svg/heroicons/refresh.svg?vue-template';
import { RANDOM_COLORS } from '@/utils/color';
import MoleculeDialog from '@/components/molecules/Dialog';
import MoleculeColorTexture from '@/components/molecules/ColorTexture';

import ColorTexture from '@/classes/ColorTexture';

export default {
  components: {
    MoleculeDialog,
    MoleculeColorTexture,
    SvgIconRefresh,
    IconButton
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    count: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      default () {
        return [new ColorTexture({ color: '#ffff00' })];
      }
    }
  },
  data () {
    return {
      RANDOM_COLORS,
      model: {},
      inputTimeout: null
    };
  },
  computed: {
    colors () {
      return Array(this.count).fill({});
    }
  },
  methods: {
    getStyle (colorTexture) {
      if (colorTexture instanceof ColorTexture) {
        return {
          '--color': colorTexture.color || 'transparent',
          '--texture-src': colorTexture.textureSrc && `url(${colorTexture.textureSrc})`,
          '--texture-scale': Number(colorTexture.textureScale)
        };
      }
      return {};
    },
    async onClick (index, show) {
      const result = await show();
      if (result) {
        this.input(index, new ColorTexture(result));
      }
    },
    input (index, value) {
      global.clearTimeout(this.inputTimeout);
      this.inputTimeout = global.setTimeout(() => {
        const values = [].concat(this.value);
        values[Number(index)] = value;
        this.$emit('input', values);
      }, 200);
    },
    onClickRandomColor (index) {
      const colorTexture = this.value[Number(index)];
      colorTexture.color = RANDOM_COLORS[(Math.max(RANDOM_COLORS.indexOf(colorTexture.color), 0) + 1) % RANDOM_COLORS.length];
      this.input(index, colorTexture);
    }
  }
};
</script>

<style lang="postcss" scoped>
.molecule-property-color-select {
  position: relative;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  & button {
    margin-left: calc(10 / 16 * 1rem);
  }

  & input[type="color"] {
    display: none;
    width: calc(48 / 16 * 1rem);
    height: calc(48 / 16 * 1rem);
    padding: calc(5 / 16 * 1rem);
    margin: calc(4 / 16 * 1rem);
    overflow: hidden;
    font-size: calc(20 / 16 * 1rem);
    font-weight: bold;
    background: var(--color-white);
    border: none;
    border-radius: calc(8 / 16 * 1rem);
    outline: none;
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
    appearance: none;

    &::-moz-color-swatch {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border-radius: calc(4 / 16 * 1rem);
    }

    &::-webkit-color-swatch-wrapper {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border-radius: calc(4 / 16 * 1rem);
    }
  }

  & .property-color-select__preview {
    width: calc(48 / 16 * 1rem);
    height: calc(48 / 16 * 1rem);
    padding: 0;
    overflow: hidden;
    background: var(--color-white);
    background: url('@/assets/grid.png');
    border: none;
    border-radius: calc(8 / 16 * 1rem);
    outline: none;
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
    appearance: none;

    & > div {
      width: 100%;
      height: 100%;
      background-color: var(--color);
      background-image: var(--texture-src);
      background-position: center;
      background-size: auto calc(var(--texture-scale) * 100%);
      box-shadow: inset 0 0 calc(10 / 16 * 1rem) rgba(0, 0, 0, 0.5);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.6s ease;
  }

  .fade-enter-active,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-15%);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateX(0%);
  }
}
</style>
