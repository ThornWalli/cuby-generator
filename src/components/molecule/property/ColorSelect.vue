<template>
  <transition name="fade">
    <div v-if="active" class="molecule-property-color-select">
      <div v-for="(item, index) in colors" :key="index">
        <input ref="input" :value="value[index]" type="color" @input="input(index, $event.target.value)">
        <icon-button @click="input(index, RANDOM_COLORS[(Math.max(RANDOM_COLORS.indexOf(value[index]), 0) + 1) % RANDOM_COLORS.length])">
          <svg-icon-refresh />
        </icon-button>
      </div>
    </div>
  </transition>
</template>

<script>
import IconButton from '@/components/atoms/IconButton';
import SvgIconRefresh from '@/assets/svg/heroicons/refresh.svg?vue-template';
import { RANDOM_COLORS } from '@/utils/color';

export default {
  components: { SvgIconRefresh, IconButton },
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
        return ['#ff0000'];
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
    input (index, value) {
      global.clearTimeout(this.inputTimeout);
      this.inputTimeout = global.setTimeout(() => {
        const values = [].concat(this.value);
        values[Number(index)] = value;
        this.$emit('input', values);
      }, 200);
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
    width: calc(48 / 16 * 1rem);
    height: calc(48 / 16 * 1rem);
    padding: calc(5 / 16 * 1rem);
    margin: calc(4 / 16 * 1rem);
    overflow: hidden;
    font-size: calc(20 / 16 * 1rem);
    font-weight: bold;
    background: white;
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
