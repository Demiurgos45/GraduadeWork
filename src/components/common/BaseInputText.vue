<template>
  <base-input-field :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :placeholder="placeholder"
      required
    >
  </base-input-field>
</template>

<script>
import formInputMixins from "@/mixins/formInputMixin"

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    }
  },
  mixins: [formInputMixins]
}
</script>

<style>

</style>