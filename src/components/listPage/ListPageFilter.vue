<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submitFilter"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentMinPrice"
          >
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentMaxPrice"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categoriesList" 
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <base-checkboxes-set 
        title="Материалы"
        :cases="materialsList"
        :selected-cases.sync="currentMaterialIds"
      />

      <base-checkboxes-set 
        title="Коллекция"
        :cases="seasonsList"
        :selected-cases.sync="currentSasonIds"
      />

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="clearFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import BaseCheckboxesSet from '../common/BaseCheckboxesSet.vue'
export default {
  components: { BaseCheckboxesSet },
  props: {
    minPrice: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    materialIds: {
      type: Array,
      required: true
    },
    seasonIds: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    materialsList: {
      type: Array,
      required: true
    },
    categoriesList: {
      type: Array,
      required: true
    },
    seasonsList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 0,
      currentCategoryId: 0,
      currentMaterialIds: [],
      currentSasonIds: []
    }
  },

  methods: {
    setFilter(minPrice, maxPrice, categoryId, materialIds, seasonIds) {
      this.$emit('update:minPrice', minPrice)
      this.$emit('update:maxPrice', maxPrice)
      this.$emit('update:categoryId', categoryId)
      this.$emit('update:materialIds', materialIds)
      this.$emit('update:seasonIds', seasonIds)
      this.$emit('update:currentPage', 1)
    },

    submitFilter() {
      this.setFilter(
        this.currentMinPrice,
        this.currentMaxPrice,
        this.currentCategoryId,
        this.currentMaterialIds,
        this.currentSasonIds
      )
    },

    clearFilter() {
      this.currentMinPrice = 0
      this.currentMaxPrice = 0
      this.currentCategoryId = 0
      this.currentMaterialIds = []
      this.currentSasonIds = []
      this.setFilter(0, 0, 0, [], [])
    }
  }
}
</script>

<style>

</style>