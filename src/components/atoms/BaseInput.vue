<template>
  <label
    v-font="[
      $getFont('Open Sans', 600, 'normal', {selector: 'span'}),
      $getFont('Open Sans', 700, 'normal', {selector: 'input'})
    ]"
    :type="type"
    class="atom-base-input"
    :class="{'js--focus':focus}"
  >
    <span v-if="label">{{ label }}</span>
    <input
      v-bind="$attrs"
      :value="value"
      :type="type"
      @input="$emit('input', $event.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    >
  </label>
</template>

<script>
export default {
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
  },
  data () {
    return {
      focus: false
    };
  }
};
</script>

<style lang="postcss" scoped>
.atom-base-input {
  display: inline-flex;
  padding: 0;
  overflow: hidden;
  font-weight: bold;
  background: #fff;
  border-radius: calc(3 / 16 * 1rem);
  box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
  opacity: 0.75;
  transition: opacity 0.3s;
  backdrop-filter: blur(8px);

  & span {
    margin-right: calc(5 / 16 * 1rem);
    background: rgba(0, 0, 0, 0.1);
    transition: color 0.3s, background 0.3s;
  }

  & input,
  & span {
    padding: calc(10 / 16 * 1rem);
    font-size: calc(20 / 16 * 1rem);
  }

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
    background: none;
    border: none;
    outline: none;
    appearance: none;
  }

  &.js--focus,
  &:focus {
    opacity: 1;

    & span {
      color: #fff;
      background: #06f;
    }
  }
}
</style>
