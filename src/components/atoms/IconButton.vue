<template>
  <button class="atom-icon-button" v-on="$listeners">
    <slot>
      <component :is="icon" />
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Object,
      default () {
        return null;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.atom-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(32 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
  padding: calc(4 / 16 * 1rem);
  font-weight: bold;
  color: var(--color-white);
  cursor: pointer;
  background: var(--color-base);
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
  transition: transform 0.3s, background-color 0.3s;
  appearance: none;
  -webkit-tap-highlight-color: transparent;

  & svg {
    display: block;
    width: calc(28 / 16 * 1rem);
  }

  @media (hover: none) {
    &:active {
      background: var(--color-red);
      transform: scale(0.9);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--color-red);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
