<template>
  <li class="catalog__item">
    <router-link 
      class="catalog__pic"
      href="#"
      :to="{name: 'itemPage', params: {id: item.id}}"
    >
      <img
        src=""
        :alt="item.title"
      >
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ item.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ item.price | numberFormat }} ₽ 
    </span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="">
          <span class="colors__value" style="background-color: #73B6EA;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000">
          <span class="colors__value" style="background-color: #8BE000;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">
          <span class="colors__value" style="background-color: #222;">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  filters: {
    numberFormat
  },

  mounted() {
    
  }
}
</script>

<style>

</style>