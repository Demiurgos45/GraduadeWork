<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled' : currentPage === 1}"
        aria-label="Предыдущая страница"
        @click.prevent="previousBtnClick"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
          
    <li
      class="pagination__item"
      v-for="pageNumber in pagesCount" :key="pageNumber"
    >
      <a 
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current' : pageNumber === currentPage}"
        @click.prevent="setPage(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
          
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled' : currentPage === pagesCount}"
        aria-label="Следующая страница"
        @click.prevent="nextBtnClick"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'currentPage',
    event: 'setPage'
  },

  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    }
  },

  methods: {
    setPage(newPage) {
      this.$emit('setPage', newPage)
    },
  
    previousBtnClick() {
      if (this.currentPage !== 1) {
        this.$emit('setPage', this.currentPage - 1)
      }
    },

    nextBtnClick() {
      if (this.currentPage !== this.pagesCount) {
        this.$emit('setPage', this.currentPage + 1)
      }
    }
  }
}
</script>

<style>

</style>