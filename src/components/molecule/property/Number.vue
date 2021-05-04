
<template>
  <transition name="fade">
    <div v-if="active" class="molecule-property-number">
      <icon-button @click="input((Number(value) - step).toFixed(2))">
        <svg-icon-minus />
      </icon-button>
      <atom-base-input
        ref="input"
        type="number"
        :min="min"
        :step="step"
        :max="max"
        :value="value"
        @input="input($event)"
      />
      <icon-button @click="input((Number(value) + step).toFixed(2))">
        <svg-icon-plus />
      </icon-button>
    </div>
  </transition>
</template>

<script>
import IconButton from '@/components/atoms/IconButton';
import AtomBaseInput from '@/components/atoms/BaseInput';

import SvgIconMinus from '@/assets/svg/heroicons/minus-sm.svg?vue-template';
import SvgIconPlus from '@/assets/svg/heroicons/plus-sm.svg?vue-template';

export default {
  components: {
    IconButton,
    AtomBaseInput,

    SvgIconMinus,
    SvgIconPlus
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String],
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style lang="postcss" scoped>
.molecule-property-number {
  position: relative;
  display: flex;
  align-items: center;

  & >>> button {
    margin: 0 calc(15 / 16 * 1rem);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  & input {
    width: 5rem;
    padding: calc(5 / 16 * 1rem);
    font-size: calc(20 / 16 * 1rem);
    font-weight: bold;
    text-align: center;
    background: white;
    border: solid #fff calc(5 / 16 * 1rem);
    border-radius: calc(3 / 16 * 1rem);
    outline: none;
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
    opacity: 0.8;
    transition: opacity 0.3s;
    appearance: none;

    &:focus {
      opacity: 1;
    }
  }
}

.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
  transform: translateX(calc(-30 / 16 * 1rem));
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
