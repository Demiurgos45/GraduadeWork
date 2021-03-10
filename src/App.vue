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
    },
    errorStatus() {
      return this.$store.state.errorPageStore.errorStatus
    }
  },

  methods: {
    checkErrorStatus() {
      if ((this.errorStatus) && (this.$router.currentRoute.name !== 'errorPage')) {
        this.$store.commit('setErrorStatus', false)
        this.$router.push({name: 'errorPage'})
      }
    }
  },

  async mounted() {
    await this.$store.dispatch('getUserAccessKey')
    this.$store.dispatch('loadBasket')
    this.$store.dispatch('getMaterials')
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getSeasons')
  },

  watch: {
    errorStatus: {
      handler() {
        this.checkErrorStatus()
      }
    }
  }
}
</script>

<style>

</style>