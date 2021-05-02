<template>
  <component :is="tag" v-bind="$attrs" v-font="$getFont('BitFont')" class="atom-base-button">
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
  font-size: calc(16 / 16 * 1rem);

  @media (min-width: 768px) {
    font-size: calc(24 / 16 * 1rem);
  }

  line-height: 1;
  color: #fff;
  text-decoration: none;
  letter-spacing: 0;
  letter-spacing: calc(1.4 / 16 * 1rem);
  background: #06f;
  border: solid #000 calc(5 / 16 * 1rem);
  border-radius: calc(3 / 16 * 1rem);
  transition: box-shadow 0.3s, transform 0.3s;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: #f00;
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
