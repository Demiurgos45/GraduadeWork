<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="currentQuantity--"
      :disabled="btnMinusDisabled"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      v-model.number="currentQuantity"
      @change="checkQuantity()"
    >

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="currentQuantity++"
      :disabled="btnPlusDisabled"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxQuantity: {
      type: Number,
      required: false,
      default: 0
    },
    quantity: {
      type: Number,
      required: true
    },
  },

  computed: {
    currentQuantity: {
      get() {
        return this.quantity
      },
      set(value) {
        if ((typeof(value) === 'number') ){
          this.$emit('update:quantity', value)
        }
      }
    },
    btnMinusDisabled() {
      return this.currentQuantity < 2
    },
    btnPlusDisabled() {
      return this.currentQuantity >= this.maxQuantity
    }
  },

  methods: {
    checkQuantity() {
      if (typeof(this.currentQuantity) !== 'number') {
        this.currentQuantity = 1
      }
      else if (this.currentQuantity < 2) {
        this.currentQuantity = 1
      }
      else if ((this.maxQuantity) && (this.currentQuantity > this.maxQuantity)) {
        this.currentQuantity = this.maxQuantity
      }
    },
  }
}
</script>

<style>

</style>