const isDev = process.env.NODE_ENV !== 'production'

export default {
  env: {},
  mode: 'spa',
  modern: !isDev,
  head: {
    titleTemplate: '%s - Newsfront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A modern PWA / native app for newsfeeds, blogs, etc., built with Nuxt.js.'
      },
      {
        property: 'og:image',
        content: 'https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png'
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.css'],
  build: {},
  buildModules: [
    // https://typescript.nuxtjs.org/guide/setup.html#installation
    // https://typescript.nuxtjs.org/guide/setup.html#module-options
    ['@nuxt/typescript-build', {
      typeCheck: true,
      loaders: {
        ts: {
          silent: true
        },
        tsx: {
          silent: true
        }
      }
    }]
  ],
  modules: [
    // https://axios.nuxtjs.org/options
    ['@nuxtjs/axios', { proxy: true }]
  ]
}
