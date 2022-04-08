<template>
  <a-card hoverable class="image-list-item content-listview-item" @click="viewImageDetail">
    <h3>{{name}}</h3>
    <a-tag class="image-list-item-verified-label" color="green" v-if="verified">
      <a-icon type="check-circle"/> Verified
    </a-tag>
  </a-card>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: String,
  },
  computed: {
    verified() {
      return this.name.indexOf('/') === -1
    },
  },
  methods: {
    viewImageDetail() {
      this.$router.push(`/image/${this.name}`)
    }
  }
})
</script>

<style scoped>
.image-list-item {
  font-weight: 500;
  height: 100px;
  display: flex;
  align-items: center;
}

.image-list-item h3 {
  display: inline-block;
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.image-list-item-verified-label {
  margin-left: 1em;
  font-size: 14px;
  padding: .25em .75em;
}
</style>
