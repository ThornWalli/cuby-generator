<template>
  <component
    :is="tag"
    v-font="fonts"
    :class="{[`style-type--${styleType}`]: true}"
    v-bind="$attrs"
    class="atom-base-button"
    v-on="$listeners"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script>
import Vue from 'vue';
const STYLE_TYPES = ['default', 'form'];
export default {
  props: {
    styleType: {
      type: String,
      default: STYLE_TYPES[0],
      validator: value => (STYLE_TYPES.includes(value))
    },
    tag: {
      type: [Object, String, Function],
      default () {
        return Vue.component('NuxtLink');
      }
    },
    label: {
      type: String,
      default: 'Button Label'
    }
  },
  computed: {
    fonts () {
      if (this.styleType === 'form') {
        return this.$getFont('Open Sans', 600);
      } else {
        return this.$getFont('BitFont');
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.atom-base-button {
  display: block;
  padding: 0;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  outline: nonel;
  appearance: none;
  -webkit-tap-highlight-color: transparent;

  &.style-type--form {
    display: flex;
    justify-content: center;
    min-width: 120px;
    padding: calc(10 / 16 * 1rem) calc(15 / 16 * 1rem);
    font-size: calc(16 / 16 * 1rem);
    line-height: 1;
    color: var(--color-white);
    background: var(--color-base);
    border: solid #000 calc(4 / 16 * 1rem);
    border-radius: calc(8 / 16 * 1rem);
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.3);
    transition: background 0.3s, box-shadow 0.3s, transform 0.3s;

    @media (hover: none) {
      &:active {
        background: var(--color-red);
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
        transform: scale(0.9);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--color-red);
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  &.style-type--default {
    padding: calc(10 / 16 * 1rem) calc(20 / 16 * 1rem);
    font-size: calc(24 / 16 * 1rem);
    color: var(--color-white);
    text-align: center;
    letter-spacing: calc(1.4 / 16 * 1rem);
    background: var(--color-base);
    border: solid var(--color-white) calc(5 / 16 * 1rem);
    border-radius: calc(3 / 16 * 1rem);
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.3);
    transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;

    @media (hover: none) {
      &:active {
        background: var(--color-red);
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
        transform: scale(0.9);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--color-red);
        box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
