<template>
  <div class="content-header-layer-info">
    <a-descriptions class="content-header-layer-info-table layer-info-table" layout="vertical">
      <a-descriptions-item>
        <template slot="label">
          <span class="content-header-layer-info-label layer-info-label">Digest</span>
        </template>
        <span style="font: JetBrainsMono">{{ layer.digest }}</span>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions class="content-header-layer-info-table layer-info-table" layout="vertical">
      <a-descriptions-item>
        <template slot="label">
          <span class="content-header-layer-info-label layer-info-label">OS/Arch</span>
        </template>
        {{ layer.manifests.v2.os }}/{{ layer.manifests.v2.architecture }}
      </a-descriptions-item>
      <a-descriptions-item>
        <template slot="label">
          <span class="content-header-layer-info-label layer-info-label">Compressed Size</span>
        </template>
        {{ layer.sizeString }}
      </a-descriptions-item>
      <a-descriptions-item>
        <template slot="label">
          <span class="content-header-layer-info-label layer-info-label">Last Update (UTC)</span>
        </template>
        {{ layer.createdUtcString }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: ["layer"],
});
</script>
