<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ itemsCount | itemsCountFormat(true) }}
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
        
        <ul class="catalog__list_2">
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
import { itemsPerPageList } from '@/config'
import BaseSelect from '@/components/common/BaseSelect'
import itemsCountFormat from '@/helpers/itemsCountFormat'

export default {
  components: { ListPageFilter, ListPageItem, ListPagePagination, BaseSelect },

  data() {
    return {
      currentPage: 1,
      currentItemsPerPage: 0,
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

  filters: {
    itemsCountFormat
  },

  computed: {
    itemsList() {
      const list = this.$store.getters.getItemsList
      return list ? list : []
    },
    itemsPerPage: {
      get() {
        let itemsPerPage = 0
        if (this.currentItemsPerPage) {
          itemsPerPage=this.currentItemsPerPage
        }
        else {
          itemsPerPage = localStorage.getItem('itemsPerPage')
          if (!itemsPerPage) {
            itemsPerPage = itemsPerPageList[0].id
            localStorage.setItem('itemsPerPage', itemsPerPage)
          }
        }
        
        return +itemsPerPage
      },
      set(value) {
        localStorage.setItem('itemsPerPage', value)
        this.currentItemsPerPage = value
      }
    },
    pagesCount() {
      return this.$store.getters.getPagesCount
    },
    itemsCount() {
      return this.$store.getters.getItemsCount
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
    loadItems() {
      this.$store.dispatch('showLoader')
      this.$store.commit('delErrorMessage')

      const filter = {
        ...this.filterState,
        page: this.currentPage,
        limit: this.itemsPerPage
      }

      this.$store.dispatch('loadItems', filter)
        .then( () => {
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
    
  },

  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.loadItems()
      }
    },

    currentItemsPerPage: {
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

.catalog__list_2 {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 210px);
  grid-gap: 40px 10px;
  margin: 0 0 70px;
}
</style>