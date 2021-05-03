<template>
  <transition-group name="fade" class="molecule-property-item-select" tag="ul" appear>
    <li v-for="item in filteredItems" :key="item.label">
      <label>
        <input :name="name" :value="item.value" type="radio" :checked="Number(value) === Number(item.value)" @input="$emit('input', $event.target.value)">
        <div>
          <component :is="item.component" v-if="item.component" />
          <img v-else-if="item.imageSrc" :src="item.imageSrc">
        </div>
      </label>
    </li>
  </transition-group>
</template>

<script>

let ASSET_SELECT_COUNTER = 0;
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default () {
        return [
          { label: 'Item Label', src: '' }
        ];
      }
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    ASSET_SELECT_COUNTER++;
    return {
      name: `assetSelect${ASSET_SELECT_COUNTER}`
    };
  },
  computed: {
    filteredItems () {
      return this.active ? this.items : [];
    }
  }
};
</script>

<style lang="postcss" scoped>
.molecule-property-item-select {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;

  & label {
    display: block;
    width: calc(48 / 16 * 1rem);
    height: calc(48 / 16 * 1rem);
    margin: calc(4 / 16 * 1rem);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    & > div {
      display: flex;
      align-items: center;
      padding: calc(5 / 16 * 1rem);
      background: white;
      border-radius: calc(8 / 16 * 1rem);
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0, 0, 0, 0.6);
      opacity: 0.6;
      transition: opacity 0.3s;
    }

    @media (hover: none) {
      &:active > div {
        opacity: 1;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover > div {
        opacity: 1;
      }
    }

    & > input:checked + div {
      opacity: 1;
    }

    & img,
    & svg {
      display: block;
      width: 100%;
      height: auto;
    }

    & input {
      display: none;
    }
  }
}

li {
  display: inline-block;
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0%);
}
</style>
