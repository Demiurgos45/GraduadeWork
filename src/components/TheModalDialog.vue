<template>
  <transition name="fade">
    <div class="modal" v-show="showDialog">
        <div class="modal__window" style="width: 400px;">
          <div class="modal__header" v-if="title.length"> {{ title }} </div>
          <div class="modal__message" v-html="messageHtml"></div>
          <input
            type="button"
            class="filter__reset button button--second"
            @click.prevent="hideDialog()"
            value="Ok"
            style="margin: 5px;"
          />
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  computed: {
    title() {
      return this.$store.getters.getTitle
    },
    messageHtml() {
      return this.$store.getters.getMessageHtml
    }
  },

  methods: {
    hideDialog() {
      this.$store.dispatch('hideDialog')
    }
  }

}
</script>

<style>
.modal {
  background: rgba(71, 71, 71, 0.3);
  background-blend-mode: color-burn;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  z-index: 1000;
}

.modal__window {
  background-color: white;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  margin: auto;
}

.modal__header {
  font-family: Geometria, Arial, sans-serif;
  font-weight: 700;
  font-size: 18px;
  padding-bottom: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  margin: 5px;
  border-bottom-color: #e02d71;
  border-bottom-style: solid;
  border-bottom-width: 3px;
}

.modal__message {
  padding-bottom: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>