<template>
  <div>
    <div class="error-page" :class="{'error-page-normal': !showTianyi, 'error-page-tianyi': showTianyi}">
      <div class="error-card">
        <img src="/tianyi-eat-docker.gif" alt="Easter Egg when Error Happens" v-if="showTianyi"/>
        <h1>{{ error.statusCode || 500 }}</h1>
        <h2>{{ error.message || 'Server Error' }}</h2>
        <a href="/">Return Home</a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: ['error'],
  head() {
    return {
      title: `Error ${this.error.statusCode || 500} - ${this.DOCKER_REGISTRY_NAME}`,
    }
  },
  computed: {
    showTianyi() {
      return this.LOGO_TIANYI
    }
  }
})
</script>

<style>
.error-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-page-normal {
  background: #2b579a;
}

.error-page-tianyi .error-card {
  position: relative;
  top: -250px;
}

.error-card {
  color: white;
  width: 800px;
  height: 350px;
  margin: auto;
  text-align: center;
}

.error-card h1 {
  text-align: center;
  font-size: 64px;
}

.error-card h2 {
  text-align: center;
  font-size: 32px;
}

.error-page-normal h1, .error-page-normal h2 {
  color: white;
}

.error-page-normal a {
  color: #c0c0c0;
}

.error-page-normal  a:hover {
  color: #e7e7e7;
}
</style>
