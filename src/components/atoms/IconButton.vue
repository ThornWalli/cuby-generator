<template>
  <button class="atom-icon-button" :class="{'icon-button--flat':flat}" v-on="$listeners">
    <span>
      <slot>
        <component :is="icon" />
      </slot>
    </span>
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
    },
    flat: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="postcss" scoped>
.atom-icon-button {
  background: none;
  border: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  /* &:focus-visible{
    border: none;
  } */

  & > span {
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
    border-radius: 50%;
    transition: transform 0.3s, background-color 0.3s;
    transform-origin: center center;

    & svg,
    & >>> svg {
      display: block;
      width: calc(28 / 16 * 1rem);
    }
  }

  @media (hover: none) {
    &:active {
      & > span {
        background: var(--color-red);
      }
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      & > span {
        background: var(--color-red);
      }
    }
  }

  &:not(.icon-button--flat) {
    & > span {
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
    }

    @media (hover: none) {
      &:active {
        & > span {
          transform: scale(0.9);
        }
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:active {
        & > span {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
