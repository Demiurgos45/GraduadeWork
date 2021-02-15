<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link
        class="header__info"
        href="#"
        :to="{name: 'listPage', params: {id: 0}}"
      >
        Каталог
      </router-link>

      <router-link
        class="header__logo"
        href="#"
        :to="{name: 'listPage', params: {id: 0}}"
      >
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <basket-state />
    </div>
  </header>
</template>

<script>
import BasketState from '@/components/common/BasketState.vue'
export default {
  components: { BasketState },

}
</script>

<style>

</style>