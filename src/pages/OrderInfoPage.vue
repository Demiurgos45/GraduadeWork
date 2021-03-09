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
            <p>Доставка: <b> {{ orderInfo.deliveryType.title }} {{ deliveryPrice | deliveryPriceFormat}} </b></p>
            <p>Итого: {{ orderInfo.basket.items.length | itemsCountFormat(true) }} на сумму <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
  <main
    v-else
    class="content container"
  >
    <div class="content__top">
      <h3> {{ errMessage }} </h3>
      <br>
      Вы можете перейти в
      <router-link
        class="message__link"
        href="#"
        :to="{name: 'listPage', params: {id: 0}}"
      >
        <b>Каталог</b>
      </router-link>
    </div>
  </main>
</template>

<script>
import itemsCountFormat from '@/helpers/itemsCountFormat'
import numberFormat from '@/helpers/numberFormat'
import orderPageListItem from '@/components/orderPage/orderPageListItem'
import deliveryPriceFormat from '@/helpers/deliveryPriceFormat'

export default {
  components: {
    orderPageListItem
  },

  filters: {
    numberFormat,
    itemsCountFormat,
    deliveryPriceFormat
  },

  data() {
    return {
      orderId: this.$route.params.id,
      errMessage: ''
    }
  },

  computed: {

    userAccessKey() {
      return this.$store.state.basketStore.userAccessKey
    },

    orderInfo() {
      return this.$store.state.orderStore.orderInfo
    },

    deliveryPrice() {
      return +this.orderInfo.deliveryType.price
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
            if ((error.response.status) && (error.response.status === 400)) {
              this.$store.dispatch('hideLoader')
              this.errMessage = error.response.data.error.message
            }
            else {
              this.$store.commit('setErrorMessage', error)
              this.$store.dispatch('hideLoader')
              this.$router.push({name: 'errorPage'})
            }
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

    '$store.state.basketStore.userAccessKey': {
      handler() {
        this.loadOrderInfo()
      }
    }
  }
}
</script>

<style>

</style>