<template>
  <transition-group name="fade" class="molecule-property-item-select" tag="ul" appear>
    <li v-for="item in filteredItems" :key="item.label">
      <label>
        <input :name="name" :value="item.value" :type="multiple ? 'checkbox' : 'radio'" :checked="checked(item)" @input="onInput($event, item)">
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
    multiple: {
      type: Boolean,
      default: false
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
      type: [String, Number, Array],
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
  },
  methods: {
    checked (item) {
      if (this.multiple) {
        return (this.value || []).find(value => String(value) === String(item.value)) !== undefined;
      } else {
        return String(this.value) === String(item.value);
      }
    },
    onInput (e, item) {
      if (this.multiple) {
        const value = new Set(this.value || []);
        if (e.target.checked) {
          value.add(e.target.value);
        } else {
          value.delete(e.target.value);
        }
        this.$emit('input', Array.from(value));
      } else {
        this.$emit('input', e.target.value);
      }
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
      background: var(--color-white);
      border-radius: calc(8 / 16 * 1rem);
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0 0 0 / 30%);
      opacity: 0.75;
      transition: opacity 0.3s, box-shadow 0.3s;
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
      box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0 0 0 / 60%);
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
