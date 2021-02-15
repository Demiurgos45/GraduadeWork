<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ itemsCount }}
        </span>        
      </div>
    </div>

    <div class="content__catalog">
      
      <list-page-filter
        v-bind.sync="filterState"
        :categories-list="categoriesList"
        :materials-list="materialsList"
        :seasons-list="seasonsList"
        :current-page.sync="currentPage"
      />

      <section class="catalog">
        
        <ul class="catalog__list">
          <list-page-item 
            v-for="item in itemsList"
            :key="item.id"
            :item="item"
          />
        </ul>

        <div class="div-table">
          <div class="div-tr">
            
            <div class="div-td">
              <list-page-pagination 
                v-model="currentPage"
                :pagesCount="pagesCount"
              />
            </div>
            <div class="div-td">
              <base-select 
                :items="perPageList"
                :selected-item.sync="itemsPerPage"
                legend="Товаров <br>на страницу"
                scrollStyle="width: auto;"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import ListPageFilter from '@/components/listPage/ListPageFilter'
import ListPageItem from '@/components/listPage/ListPageItem'
import ListPagePagination from '@/components/listPage/ListPagePagination'
import choiceOfNoun from '@/helpers/choiceOfNoun'
import { itemsPerPageList } from '@/config'
import BaseSelect from '@/components/common/BaseSelect'

export default {
  components: { ListPageFilter, ListPageItem, ListPagePagination, BaseSelect },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      perPageList: itemsPerPageList,
      filterState: {
        minPrice: 0,
        maxPrice: 0,
        categoryId: +this.$route.params.id || 0,
        materialIds: [],
        seasonIds: []
      },
      isLoadingError: false
    }
  },

  computed: {
    itemsList() {
      const list = this.$store.getters.getItemsList
      return list ? list : []
    },
    pagesCount() {
      return this.$store.getters.getPagesCount
    },
    itemsCount() {
      return this.choiceNounForGoods(this.$store.getters.getItemsCount)
    },
    categoriesList() {
      const categories = this.$store.getters.getCategories
      return categories ? categories : []
    },
    materialsList() {
      const materials = this.$store.getters.getMaterials
      return materials ? materials : []
    },
    seasonsList() {
      const seasons = this.$store.getters.getSeasons
      return seasons ? seasons : []
    }
  },

  methods: {
    choiceNounForGoods(value) {
      const nouns = ['товар', 'товара', 'товаров']
      return value + ' ' + choiceOfNoun(value, nouns)
    },
    loadItems() {
      this.$store.dispatch('showLoader')
      
      const filter = {
        ...this.filterState,
        page: this.currentPage,
        limit: this.itemsPerPage
      }

      this.$store.dispatch('loadItems', filter)
        .then( () => {

        })
        .catch( () => {
          
        })
        .then( () => {
          this.$store.dispatch('hideLoader')
        })
    }
  },

  mounted() {
    
  },

  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.loadItems()
      }
    },

    itemsPerPage: {
      handler() {
        this.loadItems()
      }
    },
    
    filterState: {
      deep: true,
      handler() {
        this.loadItems()
      }
    }
  }
}
</script>

<style>
.div-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}
.div-tr {
  display: table-row;
}
.div-td {
  display: table-cell;
  text-align: center;
  border: none;
  vertical-align: middle;
}
</style>