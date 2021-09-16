<template>
  <atom-label
    v-slot="{listeners, input, invalid, validation}"
    v-bind="validationOptions"
    class="atom-input-text"
    :label="label"
    :value="value"
    v-on="$listeners"
  >
    <input
      v-font="[
        $getFont('Open Sans', 700, 'normal')
      ]"
      v-bind="$attrs"
      :value="value"
      :type="type"
      v-on="listeners"
      @invalid="invalid($event, $event.target.value)"
      @blur="!validation($event.target.value)"
      @input="input($event.target.value)"
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
.atom-input-text {
  &[type="text"] {
    width: calc(200 / 414 * 100vw);

    @media (min-width: 576px) {
      width: 200px;
    }

    @media (min-width: 768px) {
      width: auto;
    }
  }

  & input {
    width: 100%;
    padding: calc(7 / 16 * 1rem) calc(10 / 16 * 1rem);
    margin-left: calc(5 / 16 * 1rem);
    font-size: calc(20 / 16 * 1rem);
    line-height: 1;
    background: none;
    border: none;
    outline: none;
    appearance: none;
  }
}
</style>
