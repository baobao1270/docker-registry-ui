import Vue from 'vue'
const SESSION_NAME = 'name.lty.docker-registry-ui.session'
const SESSION_NAME_USERNAME = SESSION_NAME + '.username'
const SESSION_NAME_PASSWORD = SESSION_NAME + '.password'

Vue.use({
  install(Vue, options) {
    Vue.mixin({
      data() {
        return {
          DOCKER_REGISTRY_URL: process.env.REGISTRY_URL,
          DOCKER_REGISTRY_NAME: process.env.REGISTRY_NAME,
          DOCKER_REGISTRY_PULL_DOMAIN: process.env.REGISTRY_PULL_DOMAIN,
          DOCKER_SESSION_NAME_USERNAME: SESSION_NAME_USERNAME,
          DOCKER_SESSION_NAME_PASSWORD: SESSION_NAME_PASSWORD,
          LOGO_TIANYI: process.env.LOGO_TIANYI
        }
      }
    })

    if (process.client) {
      Vue.mixin({
        data() {
          return {
            DOCKER_USERNAME: sessionStorage.getItem(SESSION_NAME_USERNAME),
            DOCKER_PASSWORD: sessionStorage.getItem(SESSION_NAME_PASSWORD)
          }
        }
      })
    }
  }
})
