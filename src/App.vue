<template>
  <div>
    <the-loader :show-loading="showLoading"/>
    <the-header v-cloak/>
    <router-view v-cloak/>
    <the-footer/>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheLoader from '@/components/TheLoader.vue'

export default {
  components: { TheHeader, TheFooter, TheLoader },
  name: 'App',

  computed: {
    showLoading() {
      return (this.$store.getters.getLoaderStatus > 0)
    }
  },

  mounted() {
    this.$store.dispatch('showLoader')
    this.$store.dispatch('getUserAccessKey')
      .then( response => {
        if (!response) {
          console.log('Can\'t receive userAccessKey')
        }
        this.$store.dispatch('hideLoader')
      })
    
    this.$store.dispatch('showLoader')
    this.$store.dispatch('getMaterials')
      .then( response => {
        if (!response) {
          console.log('Can\'t receive materials')
        }
      })
      .catch( () => {

      })
      .then( () => {
        this.$store.dispatch('hideLoader')
      })

    this.$store.dispatch('showLoader')
    this.$store.dispatch('getCategories')
      .then( response => {
        if (!response) {
          console.log('Can\'t receive categories')
        }
      })
      .catch( () => {

      })
      .then( () => {
        this.$store.dispatch('hideLoader')
      })
    
    this.$store.dispatch('showLoader')
    this.$store.dispatch('getSeasons')
      .then( response => {
        if (!response) {
          console.log('Can\'t receive seasons')
        }
      })
      .catch( () => {

      })
      .then( () => {
        this.$store.dispatch('hideLoader')
      })
  }
}
</script>
