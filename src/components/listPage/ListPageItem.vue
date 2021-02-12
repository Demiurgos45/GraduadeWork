<template>
  <li class="catalog__item">
    <router-link 
      class="catalog__pic"
      href="#"
      :to="{name: 'itemPage', params: {id: item.id, color: selectedColorId}}"
    >
      <img
        :src="imageLink"
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

    <base-color-selector
      v-if="item.colors.length > 0"
      :colors-list="item.colors"
      :color-id.sync="selectedColorId"
      :selector-id="item.slug"
    />
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import BaseColorSelector from '@/components/common/BaseColorSelector'

export default {
  components: { BaseColorSelector },
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedColorId: this.item.colors[0].color.id
    }
  },

  computed: {
    imageLink() {
      const gallery = this.item.colors.find(clr => clr.color.id === this.selectedColorId).gallery
      if (gallery) {
        return gallery[0].file.url
      }
      else {
        return ''
      }
      
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