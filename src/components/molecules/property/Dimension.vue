
<template>
  <transition name="fade">
    <div v-if="active" class="molecule-property-dimension">
      <atom-input-text
        class="property-dimension__input"
        :value="value.x"
        type="number"
        :min="min"
        :step="step"
        :max="max"
        @input="onInputWidth"
      />
      <atom-icon-button aria-label="Switch values" title="Switch values" @click="onClickRevertDimension">
        <svg-icon-switch-horizontal />
      </atom-icon-button>
      <atom-input-text
        class="property-dimension__input"
        :value="value.y"
        type="number"
        :min="min"
        :step="step"
        :max="max"
        @input="onInputHeight"
      />
      <atom-icon-button v-if="showRatioLocked" aria-label="Lock ratio" title="Lock ratio" @click="onClickRatioLocked">
        <svg-icon-lock-open v-if="ratio === null" />
        <svg-icon-lock-closed v-else />
      </atom-icon-button>
      <atom-icon-button v-if="showApplyScreen && screen" aria-label="Apply screen dimension" title="Apply screen dimension" @click="onClickApplyScreen">
        <svg-icon-desktop-computer />
      </atom-icon-button>
    </div>
  </transition>
</template>

<script>
import { ipoint } from '@js-basics/vector';
import AtomIconButton from '@/components/atoms/IconButton';
import AtomInputText from '@/components/atoms/input/Text';
import SvgIconDesktopComputer from '@/assets/svg/heroicons/desktop-computer.svg?vue-template';
import SvgIconLockOpen from '@/assets/svg/heroicons/lock-open.svg?vue-template';
import SvgIconLockClosed from '@/assets/svg/heroicons/lock-closed.svg?vue-template';
import SvgIconSwitchHorizontal from '@/assets/svg/heroicons/switch-horizontal.svg?vue-template';

export default {
  components: { AtomIconButton, AtomInputText, SvgIconDesktopComputer, SvgIconSwitchHorizontal, SvgIconLockOpen, SvgIconLockClosed },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    showRatioLocked: {
      type: Boolean,
      default: false
    },
    showApplyScreen: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default () {
        return ipoint(0, 0);
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
      width: Number(this.value.x),
      height: Number(this.value.y),
      screen: global.screen,
      timeout: null
    };
  },
  computed: {
    dimension () {
      return ipoint(this.width, this.height);
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
        this.height = Math.round(this.ratio[0] * e);
      }
    },
    onInputHeight (e) {
      this.height = e;
      if (this.ratio) {
        this.width = Math.round(this.ratio[1] * e);
      }
    },
    onClickRatioLocked () {
      if (this.ratio) {
        this.ratio = null;
      } else {
        this.ratio = [this.height / this.width, this.width / this.height];
      }
    },
    onClickApplyScreen () {
      this.width = screen.width;
      this.height = screen.height;
      if (this.ratio) {
        this.ratio = [this.height / this.width, this.width / this.height];
      }
    },
    onClickRevertDimension () {
      this.width = this.value.y;
      this.height = this.value.x;
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
