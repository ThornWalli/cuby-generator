<template>
  <div class="molecule-property" :class="{'js--toggle' : toggle}">
    <button :aria-label="label" @click="toggle = !toggle">
      <component :is="icon" />
    </button>
    <div>
      <div class="property__options">
        <component :is="component" v-model="model" :active="toggle" v-bind="options" :value="model" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgControlsEyeLeft from '@/assets/svg/controls/controls_eyeLeft.svg?vue-template';
export default {
  components: { SvgControlsEyeLeft },
  props: {
    label: {
      type: String,
      default: 'Property'
    },
    icon: {
      type: Object,
      default () {
        return SvgControlsEyeLeft;
      }
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    component: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      model: this.value,
      toggle: false
    };
  },
  watch: {
    model () {
      this.$emit('input', this.model);
    }
  }
};
</script>

<style lang="postcss" scoped>

.molecule-property {
  display: flex;
  align-items: center;

  & button {
    position: relative;
    z-index: 2;
    padding: 0;
    padding: calc(0 / 16 * 1rem);
    pointer-events: auto;
    cursor: pointer;
    background: none;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border: solid white calc(5 / 16 * 1rem + (5px - (5 / 16 * 1rem)));
    border-radius: calc(8 / 16 * 1rem);
    outline: none;
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.3);
    opacity: 0.75;
    transition: box-shadow 0.6s, background-color 0.6s, opacity 0.6s;
    backdrop-filter: blur(8px);
    appearance: none;
    -webkit-tap-highlight-color: transparent;

    & svg {
      display: block;
      width: calc(48 / 16 * 1rem);

      @media (min-width: 768px) {
        width: calc(64 / 16 * 1rem);
      }
    }
  }

  & .property__options {
    margin-left: calc(15 / 16 * 1rem);
  }

  @media (hover: none) {
    &:active {
      & button {
        background-color: #06f;
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
        opacity: 1;
      }
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      & button {
        background-color: #06f;
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
        opacity: 1;
      }
    }
  }

  pointer-events: none;

  &.js--toggle {
    pointer-events: auto;

    & button {
      background-color: #06f;
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
      opacity: 1;
    }

    & .property__options {
      display: block;
    }
  }
}

.molecule-property + .molecule-property {
  margin-top: calc(10 / 16 * 1rem);
}
</style>
