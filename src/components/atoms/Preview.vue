<template>
  <div class="atoms-preview" :class="{[`style-type--${styleType}`]:true}">
    <transition name="fade">
      <img :key="src" :src="src" :style="size.toCSSVars('size')">
    </transition>
  </div>
</template>

<script>

const STYLE_TYPES = ['default', 'color-texture'];

export default {
  props: {
    styleType: {
      type: String,
      default: STYLE_TYPES[0],
      validator: value => (STYLE_TYPES.includes(value))
    },
    src: {
      type: String,
      required: true
    },
    size: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="postcss" scoped>
.atoms-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  & img {
    display: block;
    width: calc(var(--size-x) * 1px);
    max-width: 100%;
    height: calc(var(--size-y) * 1px);
    max-height: 100%;
    object-fit: cover;
  }

  & .style-type--default {
    & img {
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0 0 0 / 60%);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s;
  transform: translate(-50%, -50%);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
