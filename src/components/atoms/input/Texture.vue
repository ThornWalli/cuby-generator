<template>
  <atom-label
    v-slot="{listeners, input, invalid}"
    :class="{'input-texture--dragging': dragging,
             'js--focus': dragging,
             'input-texture--preview': preview}"
    class="atom-input-texture"
    :label="label"
    :value="value"
    v-bind="validationOptions"
    v-on="$listeners"
  >
    <div
      @dragover="enableHighlight"
      @dragleave="disableHighlight"
      @drop="disableHighlight"
    >
      <input
        v-bind="$attrs"
        type="file"
        :accept-mime-types="acceptMimeTypes"
        v-on="listeners"
        @invalid="invalid($event, $event.target.files.length)"
        @blur="!validation($event.target.files.length)"
        @change="onChange(input,$event)"
        @error="$emit('error', $event)"
      >
      <transition name="fade" mode="in-out">
        <span :key="preview" class="input-texture__preview" :style="{'--preview': `url(${preview})`}" />
      </transition>
      <span>
        <svg-icon-upload />
      </span>
    </div>
  </atom-label>
</template>

<script>
import SvgIconUpload from '@/assets/svg/heroicons/upload.svg?vue-template';
import AtomLabel from '@/components/atoms/Label';
import ValidationMixin from '@/mixins/Validation';
import { blobToBase64 } from '@@/src/utils/blob';

export default {

  components: { SvgIconUpload, AtomLabel },

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
    acceptMimeTypes: {
      type: Array,
      default () {
        return ['image/png', 'image/jpg', 'image/jpeg'];
      }
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return { dragging: false, preview: null, blob: null };
  },
  watch: {
    value: {
      handler (value) {
        if (value) {
          this.preview = value;
        } else {
          this.preview = null;
        }
      },
      immediate: true
    }
  },

  methods: {
    async onChange (input, e) {
      const files = (e.dataTransfer || e.target).files;
      input(await blobToBase64(files[0]));
    },

    enableHighlight () {
      this.dragging = true;
    },

    disableHighlight () {
      this.dragging = false;
    }

  }
};
</script>

<style lang="postcss" scoped>
.atom-input-texture {
  & div {
    position: relative;
    width: 100%;
  }

  & .input-texture__preview {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    background-image: var(--preview);
    background-size: auto 100%;
    will-change: background-image, opacity;
  }

  & span {
    pointer-events: none;
  }

  & span:not(.input-texture__preview) {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding-right: 10px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: '';

      /* background: rgba(0, 0, 0, 0.5); */
      background: linear-gradient(135deg, rgba(255, 255, 255, 0) calc(100% / 3), rgba(255, 255, 255, 1) 100%);

      /* opacity: 0; */
      transition: opacity 0.3s;
    }

    & > * {
      position: relative;
      display: block;
      width: calc(20 / 16 * 1rem);
      transition: fill 0.3s;
    }
  }

  &.input-texture--preview:not(.js--focus) {
    & span > * {
      /* opacity: 0; */
    }
  }

  & input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    opacity: 0;
    appearance: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
