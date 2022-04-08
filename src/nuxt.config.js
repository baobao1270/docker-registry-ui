import process from 'process'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/image/:image(.+)',
        component: resolve(__dirname, 'pages/image/_image.vue')
      })
      routes.push({
        path: '/layer/:image([^@]+)@:tag',
        component: resolve(__dirname, 'pages/layer/_image@_tag.vue')
      })
    }
  },

  env: {
    REGISTRY_URL: process.env.REGISTRY_URL || 'http://localhost:5000',
    REGISTRY_NAME: process.env.REGISTRY_NAME || 'Docker Registry',
    REGISTRY_PULL_DOMAIN: process.env.REGISTRY_PULL_DOMAIN || 'cr.local',
    LOGO_TIANYI: (process.env.LOGO_TIANYI === 'true')
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '@static/common.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/docker'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
