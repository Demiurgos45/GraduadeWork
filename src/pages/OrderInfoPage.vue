<template>
  <main v-if="isOrderLoaded" class="content container">
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
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            href="#"
            aria-label="Корзина с товарами"
            :to="{name: 'basketPage'}"
          >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }} </span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-page-list-item
              v-for="item in orderBasketItems"
              :key="item.id"
              :item="item"
            />
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b> {{ orderInfo.deliveryType.title }} {{ deliveryPrice }} </b></p>
            <p>Итого: {{ orderInfo.basket.items.length | itemsCountFormat(true) }} на сумму <b>{{ orderPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
  <main v-else>
  </main>
</template>

<script>
import itemsCountFormat from '@/helpers/itemsCountFormat'
import numberFormat from '@/helpers/numberFormat'
import orderPageListItem from '@/components/orderPage/orderPageListItem'

export default {
  components: {
    orderPageListItem
  },

  filters: {
    numberFormat,
    itemsCountFormat
  },

  data() {
    return {
      orderId: this.$route.params.id
    }
  },

  computed: {

    userAccessKey() {
      return this.$store.getters.getUserAccessKey
    },

    orderInfo() {
      return this.$store.getters.getOrderInfo
    },

    orderPrice() {
      return this.$store.getters.getOrderTotalPrice
    },

    deliveryPrice() {
      let price = this.orderInfo.deliveryType.price

      if (price === '0') {
        price = 'Бесплатно'
      }
      else {
        price = numberFormat(+price) + ' ₽'
      }

      return price
    },

    isOrderLoaded() {
      if (!this.orderInfo || !this.userAccessKey) {
        return false
      }
      return true
    },

    orderBasketItems() {
      if (this.orderInfo.basket) {
        return this.orderInfo.basket.items
      }
      return []
    }
  },

  methods: {
    loadOrderInfo() {
      if ((!this.orderInfo) || (this.orderId !== this.orderInfo.id)) {
        this.$store.dispatch('showLoader')
        this.$store.dispatch('getOrderInfo', {
          id: this.orderId,
          userAccessKey: this.userAccessKey
        })
          .then( () => {
            this.$store.dispatch('hideLoader')
          })
          .catch( (error) => {
            console.log(error)
            this.$store.dispatch('hideLoader')
          })
      }
    }
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.loadOrderInfo()
      }
    },

    '$store.getters.getUserAccessKey': {
      handler() {
        this.loadOrderInfo()
      }
    }
  }
}
</script>

<style>

</style>