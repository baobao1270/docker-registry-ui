<template>
  <header>
    <div class="header-container">
      <a href="/" class="header-logo">
        <img class="header-logo" src="/docker.svg" alt="Logo"/>
      </a>
      <div>
        <a-input-search :placeholder="'Search ' + DOCKER_REGISTRY_NAME" style="margin: 8px" v-model="keyword" @pressEnter="search"/>
      </div>
      <div>
        <div class="header-userinfo">
          <a-icon type="user"/>
          <span class="header-user-username" v-if="currentUsername">{{currentUsername}}</span>
          <span class="header-user-username" v-else><a-icon type="loading"/></span>
          <a-button ghost @click="logout">Logout</a-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      keyword: null
    }
  },
  computed: {
    currentUsername() {
      return this.DOCKER_USERNAME || null
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
    },
    search() {
      location.href = '/?keyword=' + encodeURIComponent(this.keyword || '')
    }
  }
})
</script>

<style scoped>
header {
  background: #2b579a;
  color: white;
}

.header-logo {
  display: block;
  width: 32px;
  height: 32px;
  margin: auto;
  margin-right: 8px;
}

.header-container {
  width: 800px;
  margin: auto;
  display: grid;
  grid-template-columns: 40px 300px auto;
}

.header-userinfo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  height: 100%;
  padding-left: 20px;
}

.header-user-username {
  margin-left: .5em;
  margin-right: 2em;
}
</style>
