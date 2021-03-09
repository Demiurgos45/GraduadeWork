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

    <transition name="bounce">
      <span
        class="header__count"
        aria-label="Количество товаров"
        :key="itemsCount"
      >
        {{ itemsCount }}
      </span>
    </transition>
  </router-link>
</template>

<script>
export default {
  computed: {
    itemsCount() {
      return this.$store.getters.basketItemsCount
    }
  }
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>