<template>
  <div>
    <slot name="helper" :show="show" />
    <dialog ref="dialog" class="molecule-dialog">
      <transition name="dialog" @after-leave="afterLeave">
        <div v-if="!closing" ref="content">
          <div class="dialog__header">
            {{ title }}
            <atom-icon-button flat class="close" :shadow="false" @click="onClickClose">
              <svg-icon-x />
            </atom-icon-button>
          </div>
          <div class="dialog__content">
            <slot :close="close">
              Text
            </slot>
          </div>
        </div>
      </transition>
    </dialog>
  </div>
</template>

<script>

import SvgIconX from '@/assets/svg/heroicons/x.svg?vue-template';
import AtomIconButton from '@/components/atoms/IconButton';
export default {
  components: {
    AtomIconButton,
    SvgIconX
  },
  props: {
    title: {
      type: String,
      default: 'Dialog Title'
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      closing: true,
      returnValue: null,
      resolve: null,
      parentEl: null
    };
  },
  mounted () {
    this.parentEl = this.$refs.dialog.parentElement;
    document.body.appendChild(this.$refs.dialog);
  },
  beforeDestroy () {
    this.parentEl.appendChild(this.$refs.dialog);
  },
  methods: {
    show () {
      return new Promise((resolve) => {
        this.resolve = resolve;
        this.$refs.dialog.showModal();
        global.requestAnimationFrame(() => {
          this.closing = false;
        });
      });
    },
    close (value) {
      this.returnValue = value;
      this.closing = true;
    },
    onClickClose () {
      this.close(null);
    },

    afterLeave () {
      this.$refs.dialog.close(JSON.stringify(this.returnValue));
      this.$emit('close', this.returnValue);
      this.resolve(this.returnValue);
      this.returnValue = null;
    }
  }
};
</script>

<style lang="postcss">
.molecule-dialog {
  margin: auto;
  background: none;
  border: none;

  &::backdrop {
    display: block;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
  }

  & .close {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }

  & .dialog__header {
    position: relative;
    padding: calc(10 / 16 * 1rem);
    font-weight: bold;
    color: var(--color-white);
    text-align: center;
    background: var(--color-base);
  }

  & .dialog__content {
    padding: calc(10 / 16 * 1rem);
  }

  & > div {
    min-width: 320px;
    height: 100%;
    padding: 0;
    overflow: hidden;
    background: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }

  & .dialog-enter-active,
  & .dialog-leave-active {
    transition: all 0.3s ease;
  }

  & .dialog-enter-active,
  & .dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  & .dialog-enter-to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
