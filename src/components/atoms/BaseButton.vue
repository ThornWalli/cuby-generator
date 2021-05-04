<template>
  <component :is="tag" v-bind="$attrs" v-font="$getFont('BitFont')" class="atom-base-button" v-on="$listeners">
    <slot>{{ label }}</slot>
  </component>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
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
  }
};
</script>

<style lang="postcss" scoped>
.atom-base-button {
  display: block;
  padding: calc(10 / 16 * 1rem) calc(20 / 16 * 1rem);
  font-size: calc(24 / 16 * 1rem);
  color: var(--color-white);
  text-align: center;
  text-decoration: none;
  letter-spacing: 0;
  letter-spacing: calc(1.4 / 16 * 1rem);
  background: var(--color-base);
  border: solid var(--color-white) calc(5 / 16 * 1rem);
  border-radius: calc(3 / 16 * 1rem);
  box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.3);
  transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;

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
</style>
