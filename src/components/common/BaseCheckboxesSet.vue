<template>
  <fieldset class="form__block">
    <legend class="form__legend"> {{ title }} </legend>
    <ul class="check-list">
      <li
        v-for="item in cases"
        :key="item.id"
        class="check-list__item"
      >
        <label class="check-list__label">
          <input
            class="check-list__check sr-only"
            type="checkbox"
            :id="item.slug"
            :value="item.id"
            v-model="chosenCases"
          >
          <span class="check-list__desc">
            {{ item.title }}
            <span>({{ item.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    cases: {
      type: Array,
      required: true
    },
    selectedCases: {
      type: Array,
      required: true
    },
  },

  computed: {
    chosenCases: {
      get() {
        return this.selectedCases
      },
      set(newValue) {
        this.$emit('update:selectedCases', newValue)
      }
    }
  }
}
</script>

<style>

</style>