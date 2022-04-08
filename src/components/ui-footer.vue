<template>
  <footer>
    <div class="footer-container">
      Copyright &copy; {{year}} {{DOCKER_REGISTRY_NAME}}
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
    }
  },
  computed: {
    year() {
      return new Date().getUTCFullYear()
    }
  }
});
</script>

<style scoped>
footer {
  margin-top: 300px;
  background: #3f3f3f;
  color: white;
  padding: 50px 0;
}

.footer-container {
  width: 800px;
  margin: auto;
  line-height: 1.8;
}
</style>
