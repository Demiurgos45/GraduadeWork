<template>
  <div id="loader" v-show="showLoading">
    <img src="loading.gif" style="margin: auto;">
  </div>
</template>

<script>
export default {
  props: {
    showLoading: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>

<style>
#loader {
  background-color: #777;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  opacity: 0.2;
  z-index: 100;
  display: flex;
}
</style>