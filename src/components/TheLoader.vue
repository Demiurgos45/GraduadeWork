<template>
  <transition name="fade" mode="in-out">
    <div id="loader" v-show="showLoading">
      <img src="loading.gif" style="margin: auto;">
    </div>
  </transition>
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
  z-index: 100;
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>