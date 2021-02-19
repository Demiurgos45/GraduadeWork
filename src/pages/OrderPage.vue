<template>
  <main class="content container">
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
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <input class="form__input" type="text" name="name" placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <order-page-value-selector
              :items-list="deliveriesList"
              :selected-item.sync="selectedDeliveryType"
            />

            <h3 class="cart__title">Оплата</h3>
            <order-page-value-selector
              :items-list="paymentsList"
              :selected-item.sync="selectedPaymentType"
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
            <p>Доставка: <b> {{ deliveryTypeName }} </b></p>
            <p>Итого: <b>3</b> товара на сумму <b>4 070 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderPageListItem from '@/components/orderPage/orderPageListItem'
import OrderPageValueSelector from '@/components/orderPage/orderPageValueSelector.vue'
export default {
  components: { OrderPageListItem, OrderPageValueSelector },

  data() {
    return {
      selectedDeliveryType: 0,
      selectedPaymentType: 0
    }
  },

  computed: {
    itemsList() {
      return this.$store.getters.getBasketItems
    },
    deliveriesList() {
      return this.$store.getters.getDeliveries
    },
    paymentsList() {
      return this.$store.getters.getPayments
    },
    deliveryTypeName() {
      if (!this.deliveriesList || this.selectedDeliveryType == 0) {
        return 'Не выбрано'
      }
      return this.deliveriesList.find( item => item.id === this.selectedDeliveryType).title
    }
  },

  methods: {
    loadDeliveryTypes() {
      this.$store.dispatch('showLoader')
      this.$store.dispatch("loadDeliveries")
        .then( () => {
          this.selectedDeliveryType = this.deliveriesList[0].id
          this.$store.dispatch('hideLoader')
        })
        .catch( (error) => {
          this.$store.commit('setErrorMessage', error)
          this.$store.dispatch('hideLoader')
          this.$router.push({name: 'errorPage'})
        })
    },

    loadPaymentTypes() {
      this.$store.dispatch('showLoader')
      this.$store.dispatch("loadPayments", this.selectedDeliveryType)
        .then( () => {
          this.selectedPaymentType = this.paymentsList[0].id
          this.$store.dispatch('hideLoader')
        })
        .catch( (error) => {
          this.$store.commit('setErrorMessage', error)
          this.$store.dispatch('hideLoader')
          this.$router.push({name: 'errorPage'})
        })
    }
  },

  mounted() {
    this.loadDeliveryTypes();
  },

  watch: {
    selectedDeliveryType: {
      handler() {
        this.loadPaymentTypes()
      }
    }
  }
}
</script>

<style>

</style>