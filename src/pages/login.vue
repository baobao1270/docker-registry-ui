<template>
  <a-card class="login-card">
    <h1>Login</h1>
    <span>Login to {{DOCKER_REGISTRY_NAME}}</span>
    <a-input v-model="username" placeholder="Username" class="login-input login-input-username">
      <a-icon slot="prefix" type="user"/>
    </a-input>
    <a-input v-model="password" placeholder="Password" class="login-input login-input-password" type="password">
      <a-icon slot="prefix" type="lock"/>
    </a-input>
     <a-button type="primary" block class="login-input login-input-submit" @click="login">Login</a-button>
  </a-card>
</template>

<script>
import Vue from 'vue'
import Registry from '../common/registry'

export default Vue.extend({
  data() {
    return {
      username: '',
      password: '',
    }
  },
  created() {
    if (process.client) {
      sessionStorage.removeItem(this.DOCKER_SESSION_NAME_USERNAME)
      sessionStorage.removeItem(this.DOCKER_SESSION_NAME_PASSWORD)
    }
  },
  methods: {
    async login() {
      const registry = new Registry(this.$axios, this.DOCKER_REGISTRY_URL, {username: this.username, password: this.password})
      const loginResult = await registry.checkLogin()
      if (loginResult.status != 200) {
        this.$message.error(`Login failed: ${loginResult.message}`)
        return
      }
      this.$message.success('Login success')
      if (process.client) {
        sessionStorage.setItem(this.DOCKER_SESSION_NAME_USERNAME, this.username)
        sessionStorage.setItem(this.DOCKER_SESSION_NAME_PASSWORD, this.password)
        location.href = '/'
      }
    }
  },
  head() {
    return {
      title: `Login - ${this.DOCKER_REGISTRY_NAME}`,
    }
  }
})
</script>

<style>
body {
  background: #2b579a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 450px;
  height: 350px;
  margin: auto;
}

.login-input {
  margin: 1em 0;
}

.login-input-submit {
  margin-top: 2em;
}
</style>
