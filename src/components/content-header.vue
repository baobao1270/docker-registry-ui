<template>
  <div class="content-header">
    <a-skeleton class="content-header-loading" active :loading="loading">
      <content-header-nav v-if="!layer" :home="DOCKER_REGISTRY_NAME" :image="image"/>
      <content-header-nav v-else :home="DOCKER_REGISTRY_NAME" :image="image" :tag="layer.tag"/>
      <div class="content-header-content">
        <div>
          <a-icon type="code-sandbox" style="color: #c0c0c0; font-size: 38px; padding-right: 0.5em; position: relative; top: 5px;"/>
          <h1 style="display: inline-block;">{{title}}</h1>
          <a-tag v-if="imageVerified" color="#2e7f74" class="content-header-tag">
            <a-icon type="check-circle"/> Verified
          </a-tag>
          <a-tooltip v-if="layer && layer.tag == 'latest'" title="Latest is default tag, doesn't mean latest in time">
            <a-tag color="#2b579a" class="content-header-tag">
              <a-icon type="info-circle"/> Latest
            </a-tag>
          </a-tooltip>
        </div>
        <div style="padding-top: 0.5em; color: #8f9ea8; font-size: 14px;">
          To pull this image please use the following command:
          <div v-if="pullImageWithDocker">
            <pre>docker pull {{imagePullUrl}}</pre>
            <NuxtLink to="#ctr">Using containerd CLI?</NuxtLink>
          </div>
          <div v-else>
            <pre>ctr image pull {{imagePullUrl}}</pre>
            <NuxtLink to="#docker-pull">Using docker?</NuxtLink>
          </div>
        </div>
        <content-header-layer-info v-if="layer" :layer="layer"/>
      </div>
    </a-skeleton>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    loading: Boolean,
    image: String,
    layer: {
      type: Object,
      required: false,
    },
  },
  computed: {
    title() {
      if (this.layer) {
        return `${this.image}:${this.layer.tag}`;
      }
      return this.image;
    },
    pullImageWithDocker() {
      return this.$route.hash !== "#ctr";
    },
    imagePullUrl() {
      let url = `${this.DOCKER_REGISTRY_PULL_DOMAIN}/${this.image}`;
      if (this.layer) {
        url += `:${this.layer.tag}`;
      }
      return url;
    },
    imageVerified() {
      return this.image.indexOf("/") === -1;
    }
  }
});
</script>
