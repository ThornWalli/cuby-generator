<script>
export default {
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
    }
  },
  computed: {
    validationOptions () {
      return {
        validation: this.validation,
        validationSubscribe: this.validationSubscribe
      };
    }
  }
};
</script>
