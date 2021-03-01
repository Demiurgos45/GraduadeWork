<template>
  <main 
    v-if="productsCount"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            href="#"
            :to="{name: 'listPage', params: {id: 0}}"
          >
            Каталог
          </router-link>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ productsCount | itemsCountFormat(true) }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="goToOrderPage()"
      >
        <div class="cart__field">
          
            <ul class="cart__list">
              <transition-group name="list" tag="p">
                <basket-page-list-item
                  v-for="item in basketItems"
                  :key="item.id"
                  :item="item"
                />
              </transition-group>
            </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span> {{ basketPrice | numberFormat }} </span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
  <main
    v-else
    class="content container"
  >
    <div class="content__top">
      <h3> Ваша корзина пуста </h3>
      <br>
      Выберите товары в
      <router-link
        class="message__link"
        href="#"
        :to="{name: 'listPage', params: {id: 0}}"
      >
        <b> Каталоге</b>
      </router-link>
    </div>
  </main>
</template>

<script>
import basketPageListItem from '@/components/basketPage/basketPageListItem.vue'
import numberFormat from '@/helpers/numberFormat'
import itemsCountFormat from '@/helpers/itemsCountFormat'

export default {
  components: { basketPageListItem },

  filters: {
    numberFormat,
    itemsCountFormat
  },

  computed: {
    basketItems() {
      return this.$store.getters.getBasketItems
    },

    basketPrice() {
      return this.$store.getters.getBasketPrice
    },

    productsCount() {
      return this.$store.getters.getBasketProductsCount
    }
  },

  methods: {
    goToOrderPage() {
      this.$router.push({name: 'orderPage'})
    }
  }
  
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>