<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-if="showAllColors === true">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="selectorId"
          :value="0"
          v-model="selectedColor"
          :checked="clr.color.id = 0"
          :id="0"
        >
        <span class="colors__value" :style="'background: linear-gradient(red, yellow, blue);'">..
        </span>
      </label>
    </li>
    <li class="colors__item" v-for="clr in colorsList" :key="clr.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="selectorId"
          :value="clr.color.id"
          v-model="selectedColor"
          :id="clr.color.id"
          :checked="isChecked(clr.color.id)"
        >
        <span class="colors__value" :style="'background-color: ' + clr.color.code + ';'">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colorsList: {
      type: Array,
      required: true
    },
    showAllColors: {
      type: Boolean,
      required: false,
      default: false
    },
    colorId: {
      type: Number,
      required: true
    },
    selectorId: {
      type: String,
      required: true
    }
  },

  computed: {
    selectedColor: {
      get() {
        return this.colorId
      },
      set(newValue) {
        this.$emit('update:colorId', newValue)
      }
    }
  },

  methods: {
    isChecked(val) {
      return val === this.selectedColor
    }
  }
}
</script>

<style>

</style>