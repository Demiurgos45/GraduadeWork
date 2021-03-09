<template>
  <div>
    <the-loader :show-loading="showLoading" />
    <the-modal-dialog :show-dialog="showDialog" />
    <the-header />
    <router-view />
    <the-footer />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import TheLoader from '@/components/TheLoader'
import TheModalDialog from '@/components/TheModalDialog.vue'

export default {
  components: { TheHeader, TheFooter, TheLoader, TheModalDialog },
  name: 'App',

  computed: {
    showLoading() {
      return (this.$store.state.loaderStore.showLoader > 0)
    },
    showDialog() {
      return this.$store.state.modalDialogStore.showDialog
    }
  },

  mounted() {
    this.$store.dispatch('showLoader')
    this.$store.dispatch('getUserAccessKey')
      .then( () => {
        this.$store.dispatch('loadBasket')
          .then( () => {

          })
          .catch( () => {
            console.log('Can\'t load basket')
          })
          .then( () => {
            this.$store.dispatch('hideLoader')
          })
      })
      .catch( () => {
        console.log('Can\'t receive userAccessKey')
        this.$store.dispatch('hideLoader')
      })

    
    this.$store.dispatch('showLoader')
    this.$store.dispatch('getMaterials')
      .then( () => {
        this.$store.dispatch('hideLoader')
      })
      .catch( (error) => {
        this.$store.commit('setErrorMessage', error)
        this.$store.dispatch('hideLoader')
        this.$router.push({name: 'errorPage'})
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

<style>

</style>