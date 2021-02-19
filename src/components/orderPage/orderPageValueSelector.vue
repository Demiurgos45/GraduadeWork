<template>
  <ul class="cart__options options">
    <li
      v-for="item in itemsList"
      :key="item.id"
      class="options__item"
    >
      <label class="options__label">
        <input
          class="options__radio sr-only"
          type="radio"
          :id="item.id"
          v-model="currentItem"
          :value="item.id"
          :checked="item.id === currentItem"
        >
        <span class="options__value">
          {{ item.title }}
          <span v-if="item.price" style="padding-left: 10px;">
            <b> {{ +item.price | numberFormat }} </b>
          </span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: {
    itemsList: {
      type: Array,
      required: true
    },
    selectedItem: {
      type: Number,
      required: true
    }
  },

  filters: {
    numberFormat
  },

  computed: {
    currentItem: {
      get() {
        return this.selectedItem
      },
      set(val) {
        this.$emit('update:selectedItem', val)
      }
    }
  },

  methods: {
    
    
  }
}
</script>

<style>

</style>