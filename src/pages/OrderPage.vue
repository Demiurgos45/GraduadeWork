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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="sendOrder()"
      >
        <div class="cart__field">
          <div class="cart__data">
            <base-input-text
              v-model="formData.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
              :error="formError.name"
            />

            <base-input-text
              v-model="formData.address"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
            />

            <base-input-text
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
              :error="formError.phone"
            />

            <base-input-text
              v-model="formData.email"
              title="E-mail"
              type="email"
              placeholder="Введите ваш e-mail"
              :error="formError.email"
            />

            <base-input-textarea
              v-model="formData.comment"
              title="Коментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <order-page-value-selector
              :items-list="deliveriesList"
              :selected-item.sync="deliveryTypeId"
            />
            <h3 class="cart__title">Оплата</h3>
            <order-page-value-selector
              :items-list="paymentsList"
              :selected-item.sync="paymentTypeId"
            />
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-page-list-item
              v-for="item in itemsList"
              :key="item.id"
              :item="item"
            />
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b> {{ deliveryPrice | deliveryPriceFormat }} </b></p>
            <p>Итого: <b> {{ productsCount | itemsCountFormat(true) }} </b> на сумму <b> {{ basketPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="errorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorMessage }}
          </p>
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
import OrderPageListItem from '@/components/orderPage/orderPageListItem'
import OrderPageValueSelector from '@/components/orderPage/orderPageValueSelector'
import BaseInputText from '@/components/common/BaseInputText'
import BaseInputTextarea from '@/components/common/BaseInputTextarea'
import numberFormat from '@/helpers/numberFormat'
import itemsCountFormat from '@/helpers/itemsCountFormat'
import deliveryPriceFormat from '@/helpers/deliveryPriceFormat'


export default {
  components: { OrderPageListItem, OrderPageValueSelector, BaseInputText, BaseInputTextarea },

  data() {
    return {
      deliveryTypeId: 0,
      paymentTypeId: 0,
      formData: {
        name: 'Иванов Пётр Михайлович',
        address: 'Ленина 10',
        phone: '+79876543210',
        email: 'vanya@rr.ru',
        comment: 'Звонок не работает. Стучать.'
      },
      formError: {},
      errorMessage: ''
    }
  },

  filters: {
    numberFormat,
    itemsCountFormat,
    deliveryPriceFormat
  },

  computed: {
    itemsList() {
      return this.$store.state.basketStore.userBasket.items
    },

    deliveriesList() {
      return this.$store.state.orderStore.deliveries
    },

    paymentsList() {
      return this.$store.state.orderStore.payments
    },

    deliveryPrice() {
      let price = 0
      if (this.deliveriesList && this.deliveryTypeId != 0) {
        price = this.deliveriesList.find( item => item.id === this.deliveryTypeId).price
      }
      return +price
    },

    productsCount() {
      return this.$store.getters.basketProductsCount
    },

    basketPrice() {
      return (this.$store.getters.basketPrice + this.deliveryPrice)
    }
  },

  methods: {
    async loadDeliveryTypes() {
      await this.$store.dispatch("loadDeliveries")
      this.deliveryTypeId = this.deliveriesList[0].id
    },

    async loadPaymentTypes() {
      await this.$store.dispatch("loadPayments", this.deliveryTypeId)
      this.paymentTypeId = this.paymentsList[0].id
    },

    async sendOrder() {
      const userAccessKey = this.$store.state.basketStore.userAccessKey
      const data = {
        ...this.formData,
        deliveryTypeId: this.deliveryTypeId,
        paymentTypeId: this.paymentTypeId
      }

      const response = await this.$store.dispatch('sendOrder', {userAccessKey, data})

      if (response.data.error) {
        this.formError = response.data.error.request || {}
        this.errorMessage = response.data.error.message
      }
      else {
        this.$store.commit('setUserBasket', null)
        this.$router.push({name: 'orderInfoPage', params: {id: response.data.id}})
      }
    }
  },

  mounted() {
    this.loadDeliveryTypes();
  },

  watch: {
    deliveryTypeId: {
      handler() {
        this.loadPaymentTypes()
      }
    }
  }
}
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: opacity .5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}

</style>