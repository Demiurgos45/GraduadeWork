<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="getImageUrl(item)"
        width="120"
        height="120"
        alt="Название товара"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет: 
      <span>
        <i :style="'background-color: ' + item.color.color.code +';'"></i>
        {{ item.color.color.title }} 
      </span>
    </p>
    <span class="product__code">
      <p>Размер: {{ item.size.title }}</p>
      <p>Артикул: {{ item.product.id }}</p>
    </span>

    <base-quantity-input 
      :max-quantity="avaliableQuantity"
      :quantity.sync="currentQuantity"
    />

    <b class="product__price">
      {{ item.price * currentQuantity | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteItem(item.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import BaseQuantityInput from '@/components/common/BaseQuantityInput.vue'

export default {
  components: { BaseQuantityInput },

  filters: {
    numberFormat
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      
    }
  },

  computed: {
    currentQuantity: {
      get() {
        return this.item.quantity
      },
      set(val) {
        this.$store.dispatch('updateQuantity',
          {
            basketItemId: this.item.id,
            quantity: val
          }
        )
      }
    },

    avaliableQuantity() {
      return this.item.product.materials.reduce((sum, item) => sum + item.productsCount, 0)
    }
  },

  methods: {
    getImageUrl(item) {
      return item.color.gallery[0].file.url
    },

    deleteItem(id) {
      this.$store.dispatch('deleteItem', id)
    }
  }
}
</script>

<style>

</style>