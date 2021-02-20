<template>
  <li class="cart__order">
    <h3> {{ item.product.title }} </h3>
    <b> {{ item.price * item.quantity | numberFormat }} </b>
    <span>{{ itemDetail }} </span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  filters: {
    numberFormat
  },

  computed: {
    itemDetail() {
      return 'Артикул: ' +
        this.item.product.id +
        '   Цвет: ' +
        this.item.color.color.title +
        '   Размер: '+
        this.item.size.title
    }
  }
}
</script>

<style>

</style>