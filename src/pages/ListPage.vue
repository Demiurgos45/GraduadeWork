<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
      
      <list-page-filter />

      <section class="catalog">
        
        <ul class="catalog__list">
          <list-page-item 
            v-for="item in itemsList"
            :key="item.id"
            :item="item"
          />
        </ul>

        <list-page-pagination 
          v-model="currentPage"
          :pagesCount="pagesCount"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ListPageFilter from '@/components/listPage/ListPageFilter.vue'
import ListPageItem from '@/components/listPage/ListPageItem.vue'
import ListPagePagination from '@/components/listPage/ListPagePagination.vue'

export default {
  components: { ListPageFilter, ListPageItem, ListPagePagination },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      filterState: {
        minPrice: 0,
        maxPrice: 0,
        categoryId: +this.$route.params.id || 0,
        materilIds: [],
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
    }
  },

  methods: {
    loadItems() {
      this.$store.dispatch('showLoader')
      
      const filter = {
        ...this.filterState,
        page: this.currentPage,
        limit: this.itemsPerPage
      }

      this.$store.dispatch('loadItems', filter)
        .then( response => {
          console.log(response)
        })
        .catch( error => {
          console.log(error)
        })
        .then( () => {
          this.$store.dispatch('hideLoader')
        })
    }
  },

  mounted() {
    this.loadItems() 
  },

  watch: {
    currentPage() {
      this.loadItems()
    }
  }
}
</script>

<style>

</style>