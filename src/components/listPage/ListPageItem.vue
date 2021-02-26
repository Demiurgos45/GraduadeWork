<template>
  <li class="catalog__item">
    <router-link 
      class="catalog__pic_2"
      href="#"
      :to="{name: 'itemPage', params: {id: item.id, color: selectedColorId}}"
    >
      <img
        :src="imageLink"
        :alt="item.title"
      >
    </router-link>

    <h3 class="catalog__title">
      <table style="width: 210px">
        <tr>
          <td>
            <router-link 
              href="#"
              :to="{name: 'itemPage', params: {id: item.id, color: selectedColorId}}"
            >
              {{ item.title }}
            </router-link>
          </td>
          <td align="right">
            <button
              title="Добавить в корзину"
              @click.prevent="addToBasket()"
            >
              <svg width="19" height="24">
                <use xlink:href="#icon-cart"></use>
              </svg>
            </button>
          </td>
        </tr>
      </table>
    </h3>

    <div class="item__list__price">
      <span class="catalog__price">
        {{ item.price | numberFormat }} ₽ 
      </span>
      <base-select
        :items="sizesList"
        :selected-item.sync="selectedSizeId"
      />
    </div>

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
import BaseSelect from '@/components/common/BaseSelect'

export default {
  components: { BaseColorSelector, BaseSelect },
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedColorId: this.item.colors[0].color.id,
      itemSize: 0,
      sizesList: [],
      itemAddSending: false
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
    },

    selectedSizeId: {
      get() {
        if ((this.itemSize === 0) && (this.sizesList.length)) {
          return this.sizesList[0].id
        }
        return this.itemSize
      },
      set(val) {
        this.itemSize = val
      }
    }
  },

  filters: {
    numberFormat
  },

  methods: {
    addToBasket() {
      if (!this.itemAddSending) {
        this.itemAddSending = true

        this.$store.dispatch('addToBasket', {
          productId: this.item.id,
          colorId: this.selectedColorId,
          sizeId: this.selectedSizeId,
          quantity: 1
        })
          .then( () => {
            this.$store.dispatch('loadBasket')
            this.itemAddSending = false
          })
          .catch( (error) => {
            this.itemAddSending = false
            if ((error.response) &&
                (error.response.status === 400) &&
                (JSON.stringify(error.response)).indexOf('sizeId')) {
              this.$store.dispatch('showDialog', {
                title: 'Приносим извинения',
                messageHtml: 'Выбранного размера нет в наличии'
              })
            }
            else {
              this.$store.commit('setErrorMessage', error)
              this.$store.dispatch('hideLoader')
              this.$router.push({name: 'errorPage'})
            }
          })
      }
    }
  },

  created() {
    this.$store.dispatch('showLoader')
    this.$store.commit('delErrorMessage')

    this.$store.dispatch('getItemInfo', this.item.id)
      .then( (response) => {
        this.$store.dispatch('hideLoader')
        this.sizesList = response.sizes
        this.itemSize = this.sizesList[0].id
      })
      .catch( (error) => {
        this.$store.commit('setErrorMessage', error)
        this.$store.dispatch('hideLoader')
        this.$router.push({name: 'errorPage'})
      })
  },

  mounted() {
    
  }
}
</script>

<style>
.catalog__pic_2 {
  display: block;
  width: 190px;
  height: 245px;
  margin-bottom: 20px;
}
.catalog__pic_2 img {
  width: 190px;
  height: 245px;
  -o-object-fit: cover;
  object-fit: cover;
}

.item__list__price {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 100px);
  grid-gap: 0px 5px;
  margin: 0 0 5px;
}

</style>