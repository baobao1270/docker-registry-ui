<template>
  <div class="content-header-nav">
    <nav>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink to="/">
            <a-icon type="home" /> {{ this.DOCKER_REGISTRY_NAME }}
          </NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="text in parents" :key="text">{{
          text
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <NuxtLink :to="/image/ + image">
            <a-icon type="code-sandbox" />
            {{ imageBareName }}
          </NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-if="tag">
          <a-icon type="tag" /> {{ tag }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    home: String,
    image: String,
    tag: {
      type: String,
      required: false,
    },
  },
  computed: {
    parents() {
      let names = this.image.split("/");
      names.pop();
      return names;
    },
    imageBareName() {
      return this.image.split("/").pop();
    },
  },
});
</script>
