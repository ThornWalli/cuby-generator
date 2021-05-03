
<template>
  <transition name="fade">
    <div v-if="active" class="molecule-property-dimension">
      <atom-base-input
        class="property-dimension__input"
        :value="value[0]"
        type="number"
        :min="min"
        :step="step"
        :max="max"
        @input="onInputWidth"
      />
      <atom-icon-button aria-label="Switch values" title="Switch values" @click="onClickRevertDimension">
        <svg-icon-switch-horizontal />
      </atom-icon-button>
      <atom-base-input
        class="property-dimension__input"
        :value="value[1]"
        type="number"
        :min="min"
        :step="step"
        :max="max"
        @input="onInputHeight"
      />
      <atom-icon-button v-if="showRatioLock" aria-label="Lock ratio" title="Lock ratio" @click="ratio ? (ratio = null) : (ratio = height / width)">
        <svg-icon-lock-open v-if="ratio === null" />
        <svg-icon-lock-closed v-else />
      </atom-icon-button>
      <atom-icon-button v-if="showScreenApply && screen" aria-label="Apply screen dimension" title="Apply screen dimension" @click="width = screen.width; height = screen.height;">
        <svg-icon-desktop-computer />
      </atom-icon-button>
    </div>
  </transition>
</template>

<script>
import AtomIconButton from '@/components/atoms/IconButton';
import AtomBaseInput from '@/components/atoms/BaseInput';
import SvgIconDesktopComputer from '@/assets/svg/heroicons/desktop-computer.svg?vue-template';
import SvgIconLockOpen from '@/assets/svg/heroicons/lock-open.svg?vue-template';
import SvgIconLockClosed from '@/assets/svg/heroicons/lock-closed.svg?vue-template';
import SvgIconSwitchHorizontal from '@/assets/svg/heroicons/switch-horizontal.svg?vue-template';

export default {
  components: { AtomIconButton, AtomBaseInput, SvgIconDesktopComputer, SvgIconSwitchHorizontal, SvgIconLockOpen, SvgIconLockClosed },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    showRatioLock: {
      type: Boolean,
      default: false
    },
    showScreenApply: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default () {
        return [0, 0];
      }
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
  data () {
    return {
      ratio: null,
      width: this.value[0],
      height: this.value[1],
      screen: global.screen,
      timeout: null
    };
  },
  computed: {
    dimension () {
      return [this.width, this.height];
    }
  },
  watch: {
    dimension: {
      handler (dimension) {
        global.clearTimeout(this.timeout);
        this.timeout = global.setTimeout(() => {
          this.$emit('input', dimension);
        }, 50);
      },
      deep: true
    }
  },
  methods: {
    onInputWidth (e) {
      this.width = e;
      if (this.ratio) {
        this.height = this.ratio * e;
      }
    },
    onInputHeight (e) {
      this.height = e;
      if (this.ratio) {
        this.width = this.ratio * e;
      }
    },
    onClickRevertDimension () {
      this.width = this.value[1];
      this.height = this.value[0];
    }
  }
};
</script>

<style lang="postcss" scoped>
.molecule-property-dimension {
  position: relative;
  display: flex;
  align-items: center;

  & >>> button {
    margin: 0 calc(10 / 16 * 1rem);
  }

  & .property-dimension__input {
    width: 6rem;

    & >>> input {
      width: 100%;
    }
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
</style>
