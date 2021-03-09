<template>
  <main class="content container">
    <div class="content__top">
      <h2>К сожалению, произошла ошибка.</h2>
    </div>
    <hr>
    Вы можете перейти в
    <router-link
      class="message__link"
      href="#"
      :to="{name: 'listPage', params: {id: 0}}"
    >
      <b>Каталог</b>
    </router-link>
    <br>
    Если эта ошибка будет повторяться, обратитесь, пожалуйста, 
    <a href="mailto:hi@technozavrrr.com" class="message__link"><b>в службу поддержки</b>.</a><br>
    <span v-if="errorMessage.length">
      В сообщении просим указать следующую информацию:
      <br>
      <br>
      <textarea
        v-model="errorMessage"
        disabled="true"
        style="width: 700px; height: 200px;"
      ></textarea>
    </span>
    </main>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  computed: {
    errorMessage() {
      return this.$store.state.errorPageStore.errorMessage
    }
  }
}
</script>

<style>
.message__link {
  color: #222;
  border-bottom: 2px solid transparent;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.message__link:focus,
.message__link:hover {
  border-color: #e02d71;
}
</style>