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

      <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">3</span>
      </a>  
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>