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
      return this.$store.getters.getLoaderStatus
    }
  },

  mounted() {
    this.$store.dispatch('getUserAccessKey')
      .then( response => {
        if (!response) {
          console.log('Can\'t receive userAccessKey')
        }
      })


    this.$store.dispatch('hideLoader')
  }
}
</script>
