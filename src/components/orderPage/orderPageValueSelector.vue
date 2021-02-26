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
            <b> {{ +item.price | deliveryPriceFormat }} </b>
          </span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import deliveryPriceFormat from '@/helpers/deliveryPriceFormat'

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
    numberFormat,
    deliveryPriceFormat
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
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>