<template>
  <atom-label
    v-slot="{listeners, input}"
    class="atom-input-color"
    :label="label"
    v-bind="validationOptions"
    v-on="$listeners"
  >
    <input
      v-bind="$attrs"
      :value="value"
      type="color"
      @input="input($event.target.value)"
      v-on="listeners"
    >
  </atom-label>
</template>

<script>

import AtomLabel from '@/components/atoms/Label';
import ValidationMixin from '@/mixins/Validation';

export default {

  components: { AtomLabel },

  mixins: [ValidationMixin],

  props: {
    validation: {
      type: Function,
      default () {
        return [];
      }
    },
    validationSubscribe: {
      type: Function,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>

<style lang="postcss" scoped>
.atom-input-color {
  & input {
    width: 100%;
    height: calc(42 / 16 * 1rem);
    padding: 0;
    margin: 0;
    background: var(--color-white);
    background: none;
    border: none;
    outline: none;
    appearance: none;

    &::-moz-color-swatch {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border: none;
      border-radius: 0;
    }

    &::-webkit-color-swatch,
    &::-webkit-color-swatch-wrapper {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border: none;
      border-radius: 0;
    }
  }
}
</style>
