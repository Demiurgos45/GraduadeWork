import BaseInputField from "@/components/common/BaseInputField"

export default {
  components: { BaseInputField },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: String,
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    dataValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}