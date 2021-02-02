<template>
  <div>
    <the-header />
    <router-view />
    <the-footer />

  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
export default {
  components: { TheHeader, TheFooter },
  name: 'App'
}
</script>
