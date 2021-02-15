<template>
  <router-link
    class="header__cart"
    href="#"
    aria-label="Корзина с товарами"
    :to="{name: 'basketPage'}"
  >
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ itemsCount }}
    </span>
  </router-link>
</template>

<script>
export default {
  computed: {
    itemsCount() {
      return this.$store.getters.getBasketItemsCount
    }
  }
}
</script>

<style>

</style>