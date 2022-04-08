import Registry from '/common/registry'

export default class VueUtils {
  constructor(vue) {
    this.vue = vue
  }

  useRegistry(registry) {
    this.vue.state.registry = new Registry(this.vue.$axios, this.vue.DOCKER_REGISTRY_URL, {
      username: this.vue.DOCKER_USERNAME, password: this.vue.DOCKER_PASSWORD
    })
  }

  async loadWithErrorMessage(func) {
    try {
      await func()
    } catch (error) {
      if (error.status === 404) {
        this.vue.$message.error("Page not found")
        this.vue.$router.push('/404')
        return
      }

      if (error.status === 401) {
        this.vue.$message.error("You have not logged in")
        this.vue.$router.push('/login')
        return
      }

      this.vue.$message.error(`Error when getting tag info: ${error.message}`)
      throw error
    }
  }
}
