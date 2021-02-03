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
        <list-page-items-list />
        <list-page-pagination />
      </section>
    </div>
  </main>
</template>

<script>
import ListPageFilter from '@/components/listPage/ListPageFilter.vue'
import ListPageItemsList from '@/components/listPage/ListPageItemsList.vue'
import ListPagePagination from '@/components/listPage/ListPagePagination.vue'

export default {
  components: { ListPageFilter, ListPageItemsList, ListPagePagination },

}
</script>

<style>

</style>