<template>
  <div>
    <the-header />
    <router-view />
    <the-footer />

    <the-loader :show-loading="showLoading"/>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheLoader from './components/TheLoader.vue'

export default {
  components: { TheHeader, TheFooter, TheLoader },
  name: 'App',

  computed: {
    showLoading() {
      return this.$store.getters.getLoaderStatus
    }
  },

  created() {
    this.$store.dispatch('showLoader')

    this.$store.dispatch('getUserAccessKey')
      .then( response => {
        if (response) {
          console.log(response)
        }
        else {
          console.log('userAccessKey Error')
        }
      })

    this.$store.dispatch('hideLoader')
  }
}
</script>
