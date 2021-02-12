<template>
  <div class="div-table" :style="scrollStyle">
    <div class="div-tr">
      <div class="div-td">
        <legend
          v-if="legend"
          class="form__legend"
          style="marign: 0px; padding-inline-end: 5px;"
          v-html="legend"
        />
      </div>
      <div class="div-td">
        <label class="form__label form__label--small form__label--select">
          <select
            v-model="currentItem"
            class="form__select"
            type="number"
          >
            <option
              v-for="item in items"
              :key="item.id"
              :value="item.id"
              :selected="item.id == currentItem"
            >
              {{ item.title }}
            </option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    selectedItem: {
      type: Number,
      required: true
    },
    legend: {
      type: String,
      required: false,
      default: null
    },
    scrollStyle: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    currentItem: {
      get() {
        return this.selectedItem
      },
      set(value) {
        this.$emit('update:selectedItem', value)
      }
    }
  }
  
}
</script>

<style>
.div-table{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
.div-tr{
  display: table-row;
}
.div-td{
  display: table-cell;
  text-align: center;
  border: none;
  vertical-align: middle;
}
</style>