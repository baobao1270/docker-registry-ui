<template>
  <a-card hoverable class="layer-list-item content-listview-item">
    <h3>TAG</h3>
    <div class="layer-list-item-name">
      <div class="layer-list-item-name-link">
        <NuxtLink :to="layerUrl">{{layer.tag}}</NuxtLink>
        <a-icon type="star" v-if="layer.tag == 'latest'"/>
      </div>
      <div class="layer-list-item-name-pull">
        <pre v-if="pullImageWithDocker">docker pull {{imagePullUrl}}</pre>
        <pre v-else>ctr image pull {{imagePullUrl}}</pre>
      </div>
    </div>
    <div class="layer-list-item-info">
      <a-descriptions class="layer-list-item-info-table layer-info-table" layout="vertical">
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">Digest</span>
          </template>
          <NuxtLink :to="layerUrl" style="font-family: JetBrainsMono">{{layerShortDigest}}</NuxtLink>
        </a-descriptions-item>
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">OS</span>
          </template>
          {{layer.manifests.v2.os}}
        </a-descriptions-item>
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">Size</span>
          </template>
          {{layer.sizeString}}
          <a-tooltip title="Compressed Size"><a-icon type="info-circle"/></a-tooltip>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions class="layer-list-item-info-table layer-info-table" layout="vertical">
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">Last Update</span>
          </template>
          {{layer.createdUtcString}}
          <a-tooltip title="UTC Time"><a-icon type="info-circle"/></a-tooltip>
        </a-descriptions-item>
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">Architecture</span>
          </template>
          {{layer.manifests.v2.architecture}}
        </a-descriptions-item>
        <a-descriptions-item>
          <template slot="label">
            <span class="layer-list-item-info-label layer-info-label">Layers</span>
          </template>
          {{layer.manifests.v1.layers.length}}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: ['layer'],
  computed: {
    pullImageWithDocker() {
      return this.$route.hash === '#docker-pull'
    },
    imagePullUrl() {
      return `${this.DOCKER_REGISTRY_PULL_DOMAIN}/${this.layer.image}:${this.layer.tag}`;
    },
    layerShortDigest() {
      return this.layer.digest.split(':')[1].substr(0, 12)
    },
    layerUrl() {
      return `/layer/${this.layer.image}@${this.layer.tag}`
    }
  }
})
</script>

<style scoped>
.layer-list-item {
  margin: 1.5em 0;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
}

.layer-list-item h3 {
  font-size: 14px;
  font-weight: 600;
  color: #94a1aa;
}

.layer-list-item-name {
  display: grid;
  grid-template-columns: 40% 60%;
}

.layer-list-item-name-link {
  padding-top: .5em;
}

.layer-list-item-name-pull pre {
  margin: 0;
}
</style>
