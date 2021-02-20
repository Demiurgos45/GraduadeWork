<template>
  <base-input-field :title="title" :error="error">
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :placeholder="placeholder"
    ></textarea>
  </base-input-field>
</template>

<script>
import formInputMixins from "@/mixins/formInputMixin"

export default {
  mixins: [formInputMixins]
}
</script>

<style>

</style>