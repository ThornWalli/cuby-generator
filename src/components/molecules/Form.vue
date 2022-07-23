<template>
  <form class="molecule-form" @reset="onReset" @submit="onSubmit">
    <div class="form__inputs">
      <div
        v-for="input in preparedInputs"
        :key="input.name"
        :style="`width: ${100 * input.width}%;`"
      >
        <component
          :is="input.component"
          v-model="model[input.name]"
          v-bind="input.options"
          :value="model[input.name]"
          :validation="input.validation"
          :validation-subscribe="(cb) => $on('validate', cb)"
          v-on="input.listeners"
        />
      </div>
    </div>
    <div class="form__buttons">
      <div
        v-for="button in buttons"
        :key="button.label"
        :style="`width: ${100 * button.width}%;`"
      >
        <atom-base-button
          v-bind="button.options"
          v-on="button.listeners"
        />
      </div>
    </div>
  </form>
</template>

<script>
import AtomBaseButton from '@/components/atoms/BaseButton';
export default {
  components: { AtomBaseButton },
  props: {
    inputs: {
      type: Array,
      default () {
        return [];
      }
    },
    buttons: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      model: {},
      validModel: {}
    };
  },
  computed: {
    preparedInputs () {
      return this.inputs.map((input) => {
        input = Object.assign({}, input);

        if (input.validation) {
          const validation = input.validation;
          input.validation = (value) => {
            const message = validation(this.model, value);
            this.validModel[input.name] = message.length === 0;
            return message;
          };
        } else {
          this.validModel[input.name] = true;
        }

        return input;
      });
    }
  },
  watch: {
    inputs: {
      handler (inputs) {
        this.model = this.getModel(inputs);
      },
      immediate: true
    },
    model: {
      handler (model) {
        this.$emit('input', model);
      },
      deep: true
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      this.$emit('validate');
      if (!Object.values(this.validModel).includes(false)) {
        this.$emit('submit', this.model);
        console.log('SUBMIT');
      } else {
        console.log('VALIDATION ERROR');
      }
    },
    getModel (inputs = this.inputs) {
      this.validModel = inputs.reduce((result, input) => {
        input.options.required && (result[input.name] = false);
        return result;
      }, {});
      return inputs.reduce((result, input) => {
        result[input.name] = input.default || null;
        return result;
      }, {});
    },
    onReset (e) {
      e.preventDefault();
      this.model = this.getModel();
    }
  }
};
</script>
<style lang="postcss" scoped>
.molecule-form {
  margin: calc(-5 / 16 * 1rem);

  & .form__inputs {
    display: flex;
    flex-flow: row wrap;

    & > * {
      display: flex;
      padding: calc(10 / 16 * 1rem);

      & > :deep(*) {
        flex: 1;
      }
    }
  }

  & .form__buttons {
    display: flex;
    padding: calc(10 / 16 * 1rem);
  }

  & .form__inputs,
  & .form__buttons {
    & > * {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
