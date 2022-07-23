<template>
  <label
    class="atom-label"
    :class="{'js--focus':focus,'js--error':errorMessage.length, [`style-type--${styleType}`]:true}"
  >
    <span
      v-if="label"
      v-font="[
        $getFont('Open Sans', 600, 'normal'),
      ]"
      class="label__title"
    >{{ label }}</span>
    <div>
      <div class="label__error">
        <ul>
          <li v-for="(message, index) in errorMessage" :key="index">{{ message }}</li>
        </ul>
      </div>
      <div class="label__content">
        <slot
          :listeners="{
            focus:() => focus = true,
            blur:() => focus = false
          }"
          :input="onInput"
          :invalid="onInvalid"
          :validation="preparedValidation"
        />
      </div>
    </div>
  </label>
</template>

<script>

const STYLE_TYPES = ['default'];

export default {
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    value: {
      type: [String, Number, window.File],
      default: null
    },
    styleType: {
      type: String,
      default: STYLE_TYPES[0],
      validator: value => (STYLE_TYPES.includes(value))
    },
    validation: {
      type: Function,
      default () {
        return [];
      }
    },
    validationSubscribe: {
      type: Function,
      default: null
    }
  },
  data () {
    return { errorMessage: [], focus: false, error: false, invalid: false };
  },
  computed: {
    preparedValidation () {
      return (...args) => {
        this.errorMessage = this.validation(...args);
      };
    }
  },
  mounted () {
    if (this.validationSubscribe) {
      this.validationSubscribe(() => this.preparedValidation(this.value));
    }
    // if (this.form) {
    //   console.log(this.form);
    //   this.form.$on('validate', () => {
    //     console.log(this.value);
    //     this.preparedValidation(this.value);
    //   });
    // }
  },
  // destroyed () {
  //   console.log('XXXX');
  //   this.form && this.form.$off('validate', () => this.preparedValidation(this.value));
  // },
  methods: {
    onInput (value) {
      this.$emit('input', value);
      this.preparedValidation(value);
    },
    onInvalid (e, value) {
      e.preventDefault();
      this.preparedValidation(value);
    }
  }
};
</script>

<style lang="postcss" scoped>
.atom-label {
  position: relative;
  display: inline-flex;
  min-height: calc(44 / 16 * 1rem);
  padding: 0;

  /* overflow: hidden; */
  font-weight: bold;
  background: var(--color-white);
  opacity: 0.75;
  transition: opacity 0.3s;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    content: "";
    border-radius: calc(3 / 16 * 1rem);
    box-shadow: 0 0 calc(10 / 16 * 1rem) rgb(0 0 0 / 60%);
  }

  & > div {
    position: relative;
    display: flex;
    flex: 1;

    & > div {
      position: relative;
      display: flex;
      flex: 1;
      background: var(--color-white);

      /* backdrop-filter: blur(8px); */
    }
  }

  & .label__title {
    display: flex;
    align-items: center;
    padding: calc(10 / 16 * 1rem);
    overflow: hidden;
    font-size: calc(20 / 16 * 1rem);
    line-height: 1;
    color: var(--color-black);
    cursor: pointer;
    background: rgb(0 0 0 / 10%);
    border-radius: 3px 0 0 3px;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }

  & .label__content {
    overflow: hidden;
    border-radius: 0 3px 3px 0;
    transition: border-color 0.3s;
  }

  & .label__error {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    display: block;
    width: 100%;
    overflow: hidden;

    & ul {
      padding: 0;
      margin: 0;
      font-size: calc(12 / 16 * 1rem);
      color: var(--color-white);
      list-style: none;
      background: var(--color-red);
      opacity: 0;
      transition: opacity 0.2s, transform 0.2s;
      transform: translateY(-100%);

      & li {
        padding: calc(5 / 16 * 1rem) calc(10 / 16 * 1rem);
      }

      & li + li {
        padding-top: 0;
      }
    }

    border-top: 0;
  }

  @nest .molecule-dialog & {
    &::before {
      display: none;
    }

    & .label__title {
      min-width: 100px;
      border: solid #ccc;
      border-width: 1px 0 1px 1px;
    }

    & .label__content {
      border: solid #ccc;
      border-width: 1px 1px 1px 0;
    }
  }

  &.js--focus,
  &:hover,
  &:focus {
    opacity: 1;

    & .label__title,
    & .label__content {
      border-color: var(--color-base);
    }

    & > span {
      color: var(--color-white);
      background-color: var(--color-base);
    }
  }

  &.js--error {
    opacity: 1;

    & .label__title,
    & .label__content {
      border-color: var(--color-red);
    }

    & .label__content {
      border-radius: 0 calc(3 / 16 * 1rem) calc(0 / 16 * 1rem) 0;
    }

    & .label__error {
      & ul {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    & > span {
      color: var(--color-white);
      background-color: var(--color-red);
    }
  }
}

</style>
