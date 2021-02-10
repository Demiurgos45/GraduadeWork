<template>
  <main
    v-if="isLoadingError"
    class="content container"
  >
    <h3>Товар не найден</h3>
  </main>

  <main v-else
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
            :to="{name: 'listPage', params: {id: itemInfo.category.id}}"
          >
            {{ itemInfo.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ itemInfo.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            src=""
            :alt="itemInfo.title"
          >
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src=""
                :alt="itemInfo.title">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src=""
                :alt="itemInfo.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ itemInfo.id }}</span>
        <h2 class="item__title">
          {{ itemInfo.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <base-quantity-input
                :max-quantity="avaliableQuantity"
                :quantity.sync="itemQuantity"
              />

              <b class="item__price">
                {{ itemInfo.price | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <base-color-selector 
                  v-if="itemInfo.colors.length > 0"
                  :colors-list="itemInfo.colors"
                  :color-id.sync="selectedColorId"
                  :selector-id="itemInfo.slug"
                />
              </fieldset>


              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>
            
            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>
          
          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>
        
          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
  
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import BaseColorSelector from '@/components/common/BaseColorSelector.vue'
import BaseQuantityInput from '@/components/common/BaseQuantityInput.vue'

export default {
  components: { BaseColorSelector, BaseQuantityInput },
  filters: {
    numberFormat
  },

  data() {
    return {
      routerColor: +this.$route.params.color,
      isLoadingError: true,
      itemQuantity: 1
    }
  },

  computed: {
    itemInfo() {
      return this.$store.getters.getItemInfo
    },
    avaliableQuantity() {
      return this.itemInfo.materials.reduce((sum, item) => sum + item.productsCount, 0)
    },
    selectedColorId: {
      get() {
        if ((this.routerColor === '0') && (this.itemInfo)) {
          return this.itemInfo.colors[0].color.id
        }
        return this.routerColor
      },
      set(val) {
        this.routerColor = val
      }
    },

    imageLink() {
      const gallery = this.itemInfo.colors.find(clr => clr.color.id === this.selectedColorId).gallery
      
      if (gallery) {
        return gallery[0].file.url
      }
      
      return ''
    }
  },

  methods: {
    getItemInfo() {
      this.isLoadingError = true
      this.$store.dispatch('showLoader')

      this.$store.dispatch('getItemInfo', this.$route.params.id)
        .then( () => {
          this.isLoadingError = false
        })
        .catch( () => {
          
        })
        .then( () => {
          this.$store.dispatch('hideLoader')
        })
    }
  },

  watch: {
    '$route.params.id' : {
      immediate: true,
      handler() {
        this.getItemInfo()
      }
    }
  }
}
</script>

<style>

</style>