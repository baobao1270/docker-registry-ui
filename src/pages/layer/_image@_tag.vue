<template>
  <div class="container">
    <ui-header/>
    <content-header :loading="state.loading" :image="route.imageName" :layer="model.layer"/>
    <div class="content-listview content-listview-loading" v-if="state.loading">
      <a-skeleton active/>
    </div>
    <div class="history-listview content-listview" v-else>
      <div class="history-listview-header content-listview-header" style="text-transform: uppercase;">
        Image Layers
      </div>
      <div class="history-listview-list content-listview-list">
        <history-list-item v-for="(history, index) in model.layer.manifests.v2.history" :layer="history" :index="index" :key="index"/>
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
      title: `Image Tag ${this.route.imageName}:${this.route.tagName} - ${this.DOCKER_REGISTRY_NAME}`,
    };
  },
  data() {
    return {
      state: {loading: true, utils: null, registry: null},
      model: {layer: null},
      route: {imageName: '', tagName: ''}
    }
  },
  async mounted() {
    this.route.imageName = this.$route.params.image
    this.route.tagName = this.$route.params.tag
    this.state.utils = new VueUtils(this)
    this.state.utils.useRegistry()
    await this.state.utils.loadWithErrorMessage(async () => {
      this.model.layer = await this.state.registry.getTagManifests(this.route.imageName, this.route.tagName)
    })
    this.state.loading = false
  }
})
</script>
