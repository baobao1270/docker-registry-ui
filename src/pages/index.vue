<template>
    <div class="container">
      <ui-header/>
      <div class="content-listview content-listview-loading" v-if="state.loading">
        <a-skeleton active/>
      </div>
      <div class="image-listview content-listview" v-else>
        <div class="image-listview-header content-listview-header">
          Total images: {{model.images.length}} <br/>
          <span v-if="!keywordIsNullOrWhiteSpace">Searching "{{route.keyword}}", <a href="/">restore</a></span>
        </div>
        <div class="image-listview-list content-listview-list">
          <image-list-item v-for="imageName in model.images" :name="imageName" :key="imageName"/>
        </div>
      </div>
      <ui-footer/>
    </div>
</template>

<script>
import Vue from 'vue'
import VueUtils from '/common/vue-utils'

export default Vue.extend({
  head() {
    return {
      title: `Explore - ${this.DOCKER_REGISTRY_NAME}`,
    }
  },
  data() {
    return {
      state: {loading: true, utils: null, registry: null},
      model: {images: []},
      route: {keyword: ''}
    }
  },
  computed: {
    keywordIsNullOrWhiteSpace() {
      return this.route.keyword === '' || this.route.keyword === null
    }
  },
  async mounted() {
    this.route.keyword = this.$route.query.keyword || ''
    this.state.utils = new VueUtils(this)
    this.state.utils.useRegistry()
    await this.state.utils.loadWithErrorMessage(async () => {
      this.model.images = await this.state.registry.listImages()
    })
    if (!this.keywordIsNullOrWhiteSpace) {
      const remainImages = []
      this.model.images.forEach(imageName => {
        if (imageName.indexOf(this.route.keyword) !== -1) {
          remainImages.push(imageName)
        }
      })
      this.model.images = remainImages
    }
    this.state.loading = false
  }
})
</script>
