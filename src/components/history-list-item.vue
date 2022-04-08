<template>
  <a-card hoverable class="history-list-item content-listview-item">
    <h3>#{{index + 1}}</h3>
    Command:
    <pre>{{layer.created_by}}</pre>
  </a-card>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    index: Number,
    layer: Object
  }
})
</script>

<style scoped>
pre {
  word-break: break-all;
  word-wrap:break-word;
  white-space: pre-wrap;
}
</style>
