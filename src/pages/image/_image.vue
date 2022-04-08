<template>
  <div class="container">
    <ui-header/>
    <content-header :loading="state.loading" :image="route.imageName"/>
    <div class="content-listview content-listview-loading" v-if="state.loading">
      <a-skeleton active/>
    </div>
    <div class="layer-listview content-listview" v-else>
      <div class="layer-listview-header content-listview-header">
        Sort: <a-select default-value="newest" v-model="state.sort" @change="sortLayers" style="width: 10em">
          <a-select-option value="newest"> Newest </a-select-option>
          <a-select-option value="oldest"> Oldest </a-select-option>
        </a-select>
      </div>
      <div class="layer-listview-list content-listview-list">
        <layer-list-item v-for="layer in model.layers" :key="layer.tag" :layer="layer"/>
      </div>
    </div>
    <ui-footer/>
  </div>
</template>

<script>
import Vue from "vue";
import VueUtils from '/common/vue-utils'

export default Vue.extend({
  head() {
    return {
      title: `Image ${this.route.imageName} - ${this.DOCKER_REGISTRY_NAME}`,
    };
  },
  data() {
    return {
      state: {loading: true, utils: null, registry: null, sort: "newest"},
      model: {layers: []},
      route: {imageName: ''}
    }
  },
  methods: {
    sortLayers() {
      const k = ((this.state.sort === "newest") ? -1 : 1)
      const layers = this.model.layers;
      layers.sort((a, b) => {
        if (a.tag === "latest") { return -1 }
        if (b.tag === "latest") { return 1 }
        return (a.createdTimestamp - b.createdTimestamp) * k
      });
      this.layers = layers
    }
  },
  async mounted() {
    this.route.imageName = this.$route.params.image;
    this.state.utils = new VueUtils(this)
    this.state.utils.useRegistry()
    await this.state.utils.loadWithErrorMessage(async () => {
      const tags = await this.state.registry.listImageTags(this.route.imageName)
      const requests = []
      tags.forEach(tag => {requests.push(this.state.registry.getTagManifests(this.route.imageName, tag))})
      const layers = await Promise.all(requests);
      layers.forEach(layer => {this.model.layers.push(layer)})
    })
    this.sortLayers()
    this.state.loading = false
  },
});
</script>
