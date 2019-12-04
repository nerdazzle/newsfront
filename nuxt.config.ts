/* eslint-disable no-console */
import path from 'path'
import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'

import purgecss from '@fullhuman/postcss-purgecss'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'

/*
 ** .env - Load environment settings from file if present
 ** See: https://github.com/nuxt-community/dotenv-module
 */
dotenv.config()

/*
 ** Node enviroment check
 ** IMPORTANT: 'production' NODE_ENV has nothing to do with your app's
 ** deploy environment (stage, qa, prod, etc).
 ** It really means "optimized build for deploying *wherever*.
 ** Enable debugging & turn off optimizations if NODE_ENV !== 'production'
 */
const isDev = process.env.NODE_ENV !== 'production'

// TODO: Remove
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`NUXT_HOST: ${process.env.NUXT_HOST}`)
console.log(`NUXT_PORT: ${process.env.NUXT_PORT}`)

// Nuxt Configration docs: https://nuxtjs.org/api/configuration-env
export default {
  // In Dev mode use universal SSR for fast HMR performance.
  // In Production mode use SPA for service worker / etc.
  // See: https://recurse.me/posts/choosing-a-nuxt-mode.html
  mode: isDev ? 'universal' : 'spa',

  modern: !isDev,

  /*
   ** env variables defined here will be passed to the client side
   ** If you define environment variables starting with NUXT_ENV_ in the build phase
   ** (ex: NUXT_ENV_COOL_WORD=freezing nuxt build), they'll be automatically injected
   ** into the process environment. Be aware that they'll potentially take precedence
   ** over defined variables in your nuxt.config.js with the same name.
   */
  env: {},

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Newsfront',

    meta: [
      // TODO: Customize open Graph tags. Some are already injected. See built html.
      // See: https://css-tricks.com/essential-meta-tags-social-media/
      //
      // { property: 'og:image', content: '// TODO: Add URL to app screenshot PNG file' },
      // { property: 'og:title', content: 'My Title' }
      // { property: 'og:description', content: 'My Description' }
      //
      // { property: 'twitter:card', content: 'summary_large_image' },
      // { property: 'twitter:site', content: '@nuxt_js' }
      // { property: 'twitter:title', content: 'My Title' },
      // { property: 'twitter:description', content: 'My Description' },
      // { property: 'twitter:image', content: 'http://euro-travel-example.com/thumbnail.jpg' },

      // ************************************
      // COMMENTED OUT FROM EXAMPLE (probably not needed)
      // ************************************
      //
      // { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: 'A modern PWA / native app for newsfeeds, blogs, etc., built with Nuxt.js.'
      // },
      // {
      //   property: 'og:image',
      //   content: 'https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png'
      // },
      // { property: 'twitter:card', content: 'summary_large_image' },
      // { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [
      // TODO: This should be handled by nuxt-rfg-icon module.  Remove if redundant.
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      /*
       ** Inject dns-prefetch & preconnect headers for
       ** all the domains we are going to connect to.
       **
       ** See: https://www.keycdn.com/blog/resource-hints
       ** See: https://responsivedesign.is/articles/prefetch-preconnect-dns-priority/
       */
      /* jshint -W014 */
      ...(process.env.NUXT_ENV_PRECONNECT
        ? process.env.NUXT_ENV_PRECONNECT.split(';')
          .map((href) => href.trim())
          .map((href) => ({
            rel: 'dns-prefetch',
            href
          }))
        : []),
      ...(process.env.NUXT_ENV_PRECONNECT
        ? process.env.NUXT_ENV_PRECONNECT.split(';')
          .map((href) => href.trim())
          .map((href) => ({
            rel: 'preconnect',
            href
          }))
        : [])
    ]
  },
  /*
  ** Customize the progress-bar
  */
  // TODO: What's the difference between this and the PWA's loading prop?
  //
  // loading: { color: '#3B8070' },
  loading: '~/components/loading', // TODO: Omit the file extension if this has an error

  /*
   ** Global CSS
   **
   ** TODO: Follow up: The docs say to omit the file extension for SCSS/Postcss/Less/Stylus/... files, but that doesn't seem to apply to this main.css file.
   */
  css: [
    // 'tachyons/css/tachyons.min.css',
    '~/assets/css/main.css'
  ],

  /*
   ** Plugins to load before mounting the App
   **
   ** Every time you need to use Vue.use(), you should create a
   ** file in plugins/ and add its path to plugins in nuxt.config.js.
   ** https://nuxtjs.org/guide/plugins
   **
   ** Examples:
   **   { src: '~/plugins/both-sides.js' },
   **   { src: '~/plugins/client-only.js', mode: 'client' },
   **   { src: '~/plugins/server-only.js', mode: 'server' }
   **
   **   '~/plugins/foo.client.js', // only in client side
   **   '~/plugins/bar.server.js', // only in server side
   **   '~/plugins/baz.js' // both client & server
   */
  plugins: [
    '~/plugins/filters',
    '~/plugins/vue-tour.client'
    //  '~/plugins/vue-wait.client',
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    ...[
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',

      // '@nuxt/typescript-build',

      '@nuxtjs/dotenv',

      // https://github.com/nuxt-community/vuetify-module
      '@nuxtjs/vuetify',

      // Google Analytics module configuration
      // See: https://github.com/nuxt-community/analytics-module
      // See: https://matteogabriele.gitbooks.io/vue-analytics/content/
      [
        '@nuxtjs/google-analytics',
        {
          dev: false,
          id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_ID || 'TEST'
        }
      ]
    ]
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://github.com/pimlie/nuxt-rfg-icon
    // Note: Add nuxt-rfg-icon to modules section of nuxt.config.js before the line @nuxtjs/manifest
    // 'nuxt-rfg-icon',

    // 'nuxt-webfontloader',

    '@nuxtjs/pwa',

    // https://github.com/mvertopoulos/nuxt-axios-duplicate-blocker
    /*
    [
      'nuxt-axios-duplicate-blocker',
      {
        // If set to true it will always show a warning in console whenever a request has been blocked.
        debug: isDev,
        // If set to true all active API requests will be canceled when switching pages.
        onPageChange: true,
        // Sets the default policy for blocking requests. If set to true all requests will be blocked unless specified otherwise in the request configuration of a call with the blockAllowed option.
        blockByDefault: true,
        // Set the key in headers section of Axios's request configuration, to be used as the container of the request configuration options for this module. Read the important note below for more details.
        // In version 0.19.0, axios module introduced a breaking change that disallows extra parameters to be added in the request configuration object. There is a ticket about this issue here and a fix but it has not been officially released by the time of this writing.
        // Until the official release of this fix, in order to make the custom request options for this module work again, you must set the headerBlockerKey property in Module Options to a string that will be used for passing them as a property in the headers section of the Request Configuration Options. This property will be deleted from the headers section before the request is sent.

        // await this.$axios.$get('/example-api/example', {
        //   params: { ... },
        //   headers: {
        //       blocker: {
        //           requestKey: 'customRequestKeyName',
        //           blockAllowed: false
        //       }
        //   }
        // });

        // This feature will be removed in the next major release of this module so use the ^ sign, in your package.json dependency in order to avoid compatibility issues.
        headerBlockerKey: 'blocker'
      }
    ],
    */

    // TODO: https://github.com/vuejs/vuex-router-sync

    // Axios module must be added AFTER 'nuxt-axios-duplicate-blocker'
    // https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // https://github.com/nuxt-community/amp-module
    '@nuxtjs/amp',

    // // https://github.com/f/vue-wait
    // // https://medium.com/@fkadev/managing-complex-waiting-experiences-on-web-uis-29534d2d92a8
    'vue-wait/nuxt',

    // https://github.com/wemake-services/nuxt-imagemin
    [
      'nuxt-imagemin',
      {
        optipng: { optimizationLevel: 5 },
        gifsicle: { optimizationLevel: 2 }
      }
    ],

    // https://github.com/Timkor/nuxt-polyfill#readme
    // Note: You need to install the NPM packages manually.
    // Example: npm i url-polyfill intersection-observer smoothscroll-polyfill
    'nuxt-polyfill',

    // https://github.com/rigor789/vue-scrollto
    // https://github.com/rigor789/vue-scrollto/tree/master/docs/examples
    ['vue-scrollto/nuxt', { duration: 300 }],
    // https://github.com/nuxt-community/modules/tree/master/packages/browserconfig
    // '@nuxtjs/browserconfig',

    // https://nuxtent-module.netlify.com/guide/introduction
    // https://nuxtent-module.netlify.com/guide/configuration
    // Note: @nuxtjs/axios` is a peer dependency so you will need to have it installed, as well.
    // 'nuxtent'

    // https://github.com/nuxt-community/blog-module
    // [{ src: '@nuxtjs/blog' }]

    // https://github.com/nuxt-community/modules/tree/master/packages/ngrok
    // https://github.com/bubenshchykov/ngrok
    /*
    [
      '@nuxtjs/ngrok',
      {
        // subdomain: 'foobar',
        // proto: 'tls',
        // auth: 'https',
        // subdomain: 'newsfront',
        // authtoken: '',
        // region: 'us',
        configPath: '~/ngrok.yml'
      }
    ]
    */

    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',

    // https://github.com/nuxt-community/nuxt-logrocket
    'nuxt-logrocket',

    // // https://github.com/nuxt-community/google-adsense-module
    // ['@nuxtjs/google-adsense', {
    //   id: 'ca-pub-###########'
    // }],

    // https://github.com/nuxt-community/google-optimize/
    'nuxt-google-optimize',

    // KEEP AT BOTTOM OF LIST:

    // https://github.com/nuxt-community/sitemap-module
    // If you use other modules (eg. nuxt-i18n), always declare the sitemap module at end of array
    '@nuxtjs/sitemap'
  ],

  // https://github.com/f/vue-wait
  wait: { useVuex: true },

  // // You can optionally use global options instead of inline form
  // browserconfig: {
  //   TileColor: '#3f51b5',
  //   square150x150logo: {'@':{src:'icon.png'}}
  // }

  /*
   ** AMP module configuration
   ** https://github.com/nuxt-community/amp-module
   ** Options: https://github.com/nuxt-community/amp-module/blob/master/docs/api/options.md
   ** Elements: https://github.com/nuxt-community/amp-module/blob/master/docs/api/amp-elements.md
   ** Components: https://github.com/nuxt-community/amp-module/blob/master/docs/api/components.md
   */
  amp: {
    // if we do this it should reflect the local port and host env variables
    origin: isDev ? 'http://localhost:8080' : undefined
  },

  /*
   ** Axios module configuration
   ** https://axios.nuxtjs.org/options
   ** https://axios.nuxtjs.org/usage
   ** https://github.com/axios/axios
   */
  axios: {},

  /*
   ** PWA configuration
   */
  pwa: {
    // See: https://pwa.nuxtjs.org/modules/icon.html
    icons: {
      accessibleIcons: false
    },
    // See: https://pwa.nuxtjs.org/modules/meta.html
    meta: {
      // TODO: Make sure this doesn't screw up the login page by getting rid of the back button, etc.
      nativeUI: true
    },

    // TODO: Reduce bundle sizes by replacing the built in loading indicator with vuetify's if possible
    // TODO: What's the difference between this and the main loading prop?
    //
    loading: {
      color: '#17ffe2'
    },

    manifest: {
      // TODO: Customize these settings for your app
      //
      // 'name' is the full app name.
      // 'short_name' represents the name displayed to the user if there is
      // not enough space to display name (e.g., as a label for an icon on
      // the phone home screen).
      //
      // Example:
      //   name: "Awesome application",
      //   short_name: "Awesome app"
      //
      // See: https://developer.mozilla.org/en-US/docs/Web/Manifest/name
      // defaults to package name
      // name: appName,
      // See: https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name
      // short_name: appShortName,
      // TODO: Customize categories.
      categories: ['news'],
      // See standardized categories list: https://github.com/w3c/manifest/wiki/Categories
      background_color: '#ffffff',
      theme_color: '#ffffff',
      display: 'standalone',
      scope: '.',
      /*
       ** Analytics tracking.  See https://www.creativebloq.com/features/9-amazing-pwa-secrets
       ** The next important tracking event is when the user opens the app from the home screen. That means the user has clicked the app's icon or, on Android with WebAPK support, also clicked on a link pointing to the PWA scope.
       ** The simplest way to do this is through the manifest's start_url attribute, adding a tracking event in the URL that can be automatically used as an origin from an Analytics script, such as:
       */
      // TODO: Verify that this URL (relative to the manifest file) works if the app is hosted in a sub-path (not the domain root).
      // Twitter's example (while in browser, not PWA mode):
      //    start_url: 'https://mobile.twitter.com/?utm_source=homescreen&utm_medium=shortcut',
      start_url: '../?utm_source=standalone&utm_medium=pwa',
      // See: Basic Auth with workbox - https://pwa.nuxtjs.org/modules/workbox.html#basic-auth
      crossorigin: 'use-credentials'
      // TODO: Obtain an IARC rating ID for your app (it's easy & quick)
      // See: https://developer.mozilla.org/en-US/docs/Web/Manifest/iarc_rating_id
      // iarc_rating_id: ''
      // TODO: Check how this affects tablets - should landscape be allowed on tablets?
      // https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
      // Note: Twitter does not define an orientation value
      // orientation: 'portrait'
      // TODO: Implement screenshots feature (?)
      // screenshots: [
      //   {
      //     src: 'screenshot1.webp',
      //     sizes: '1280x720',
      //     type: 'image/webp'
      //   },
      //   {
      //     src: 'screenshot2.webp',
      //     sizes: '1280x720',
      //     type: 'image/webp'
      //   }
      // ],
      // TODO: Allow the app to act as a share target?
      // Example from Twitter:
      //   share_target: {
      //     action: 'compose/tweet',
      //     enctype: 'multipart/form-data',
      //     method: 'POST',
      //     params: {
      //       title: 'title',
      //       text: 'text',
      //       url: 'url',
      //       files: [
      //         {
      //           name: 'externalMedia',
      //           accept: [
      //             'image/jpeg',
      //             'image/png',
      //             'image/gif',
      //             'video/quicktime',
      //             'video/mp4'
      //           ]
      //         }
      //       ]
      //     }
      //   },
      // TODO: Fill this in
      // prefer_related_applications: https://developer.mozilla.org/en-US/docs/Web/Manifest/prefer_related_applications
      // related_applications: https://developer.mozilla.org/en-US/docs/Web/Manifest/related_applications
      // Example from Twitter:
      //    android_package_name: 'com.twitter.android',
      //    prefer_related_applications: true,
      //    related_applications: [
      //       {
      //          id: 'com.twitter.android',
      //          platform: 'chromeos_play',
      //          url: 'https://play.google.com/store/apps/details?id=com.twitter.android'
      //       }
      //    ]
    },
    /*
     ** Workbox config
     ** See: https://pwa.nuxtjs.org/modules/workbox.html#options
     ** See: https://pwa.nuxtjs.org/modules/workbox.html#workbox-window
     */
    workbox: {
      config: {
        debug: isDev,
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
            handler: 'cacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }

      // TODO: CDN caching - https://pwa.nuxtjs.org/modules/workbox.html#adding-custom-runtimecaching-items-for-cdn
      // TODO: Custom strategy options - https://pwa.nuxtjs.org/modules/workbox.html#adding-custom-cache-strategyoption
      // TODO: Hooking on service worker registration lifecycle - https://pwa.nuxtjs.org/modules/workbox.html#hooking-on-service-worker-registration-life-cycle
      // TODO: Runtime Caching for other origins https://pwa.nuxtjs.org/modules/workbox.html#runtimecaching

      // Workaround: Range request required for safari
      // See: https://pwa.nuxtjs.org/modules/workbox.html#enable-rangerequests
      // cachingExtensions: '@/plugins/workbox-range-request.js'
    }
  },

  // Configure polyfills:
  polyfill: {
    features: [
      /*
          Feature without detect:

          Note:
            This is not recommended for most polyfills
            because the polyfill will always be loaded, parsed and executed.
      */
      // {
      //   require: 'url-polyfill' // NPM package or require path of file
      // },
      /*
          Feature with detect:

          Detection is better because the polyfill will not be
          loaded, parsed and executed if it's not necessary.
      */
      // {
      //   require: 'intersection-observer',
      //   detect: () => 'IntersectionObserver' in window
      // },
      /*
          Feature with detect & install:

          Some polyfills require a installation step
          Hence you could supply a install function which accepts the require result
      */
      // {
      //   require: 'smoothscroll-polyfill',
      //   // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
      //   detect: () =>
      //     'scrollBehavior' in document.documentElement.style && window.__forceSmoothScrollPolyfill__ !== true,
      //   // Optional install function called client side after the package is required:
      //   install: (smoothscroll) => smoothscroll.polyfill()
      // }
    ]
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // TODO: If you're building an application that will need to work offline (more likely a PWA),
    // you will need to bundle your fonts and icons in your app instead of using online resources.
    //
    // It means you must set defaultAssets option to false.
    //
    // For fonts, you may leverage CSS @font-face rule with local path of your fonts.
    //
    // For icons, you can either use the same way than above, or leverage tree-shaken SVG libraries
    // like Material Design Icons SVG or Font Awesome 5 SVG.
    //
    // https://github.com/nuxt-community/vuetify-module#offline-applications

    // TODO: switch to this
    // defaultAssets: false,
    // optionsPath: './vuetify.options.js'

    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: 'mdi'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // https://github.com/pimlie/nuxt-rfg-icon
  // rfg: {
  //   design: {
  //     ios: {
  //       pictureAspect: 'backgroundAndMargin',
  //       backgroundColor: '#ffffff',
  //       margin: '14%',
  //       assets: {
  //         ios6AndPriorIcons: false,
  //         ios7AndLaterIcons: false,
  //         precomposedIcons: false,
  //         declareOnlyDefaultIcon: true
  //       }
  //     },
  //     desktopBrowser: {},
  //     windows: {
  //       pictureAspect: 'whiteSilhouette',
  //       backgroundColor: '#ffffff',
  //       onConflict: 'override',
  //       assets: {
  //         windows80Ie10Tile: false,
  //         windows10Ie11EdgeTiles: {
  //           small: false,
  //           medium: true,
  //           big: false,
  //           rectangle: false
  //         }
  //       }
  //     },
  //     androidChrome: {
  //       pictureAspect: 'noChange',
  //       themeColor: '#ffffff',
  //       manifest: {
  //         display: 'standalone',
  //         orientation: 'notSet',
  //         onConflict: 'override',
  //         declared: true
  //       },
  //       assets: {
  //         legacyIcon: false,
  //         lowResolutionIcons: false
  //       }
  //     },
  //     safariPinnedTab: {
  //       pictureAspect: 'silhouette',
  //       themeColor: '#5bbad5'
  //     }
  //   },
  //   settings: {
  //     scalingAlgorithm: 'Mitchell',
  //     errorOnImageTooSmall: false
  //   }
  // },

  // https://github.com/Developmint/nuxt-purgecss
  purgeCSS: {
    // your settings here
  },

  // https://github.com/nuxt-community/nuxt-logrocket
  logRocket: {
    // https://app.logrocket.com/qwobng/newsfront
    logRocketId: 'qwobng/newsfront',
    devModeAllowed: isDev
  },

  // // https://github.com/nuxt-community/google-adsense-module
  // 'google-adsense': {
  //   id: 'ca-pub-#########'
  // },

  // https://github.com/nuxt-community/google-optimize/
  googleOptimize: {
    // experimentsDir: '~/experiments',
    // maxAge: 60 * 60 * 24 * 7 // 1 Week
    // pushPlugin: true,
  },

  // https://github.com/nuxt-community/sitemap-module
  // TODO: Configure
  // sitemap: {
  //   hostname: 'https://example.com',
  //   gzip: true,
  //   exclude: ['/secret', '/admin/**'],
  //   routes: [
  //     '/page/1',
  //     '/page/2',
  //     {
  //       url: '/page/3',
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmod: '2017-06-30T13:30:00.000Z'
  //     }
  //   ]
  // },

  /*
   ** Build configuration
   */
  build: {
    // https://www.purgecss.com/guides/nuxt
    extractCSS: true,

    /*
    PostCSS plugin
    Using the extractCSS option Nuxt will create CSS files that will be loaded separately by the browser. When generating your application this might be a lot of small files.
    To include the CSS into the header of the HTML file you'll need to run the following commands. Please note that using this configuration PurgeCSS will be active in production and development mode.
    */
    // https://www.purgecss.com/guides/nuxt
    // TODO: Do we WANT to enable the block below (to include CSS in the header of the html file),
    // or do we want to let it load from smaller files separately?
    postcss: {
      plugins: [
        purgecss({
          content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue'],
          whitelist: ['html', 'body'],
        })
      ]
    },

    // nuxtjs.org/api/configuration-vue-config
    // /*
    // TODO: This only applies if using nuxt JS but we're using nuxt TS. Still, better keep
    // this comment here for now in case I go back to nuxt JS.
    // TODO: Check if workaround for @nuxt/babel-preset-app issue is still recommended)
    // https://github.com/nuxt-community/nuxt-property-decorator#nuxt-js-instructions
    // (last check 11/13/2019)
    // */
    // babel: {
    //   plugins: [
    //     ["@babel/plugin-proposal-decorators", s { legacy: true }],
    //     ["@babel/plugin-proposal-class-properties", { loose: true }]
    //   ]
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isDev) {
        // Remove unused CSS using PurgeCSS. See https://github.com/FullHuman/purgecss
        // for more information about PurgeCSS.
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body']
          })
        )
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(ts|js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|dist|\.nuxt|\.vscode)/
        })
      }
    }
  },

  // generate: {
  //   // routes: () => axios.get('https://my-api/users')
  //   //   .then(res => res.data.map((user) => `/users/${user.id}`)),
  // },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // TODO: HIGH PRIORITY: See what this does. From hackernews-nuxt-ts
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // axios: {
  //   debug: isDev,
  //   proxy: true
  // },
  // proxy: {
  //   "/api": {
  //     target: "https://api.hnpwa.com/v0/",
  //     pathRewrite: {
  //       "^/api/": ""
  //     }
  //   }
  // },
  // serverMiddleware: ["~/common/cache"],
  // render: {
  //   http2: {
  //     push: true
  //   },
  //   static: {
  //     maxAge: "1y",
  //     setHeaders(res, path) {
  //       if (path.includes("sw.js")) {
  //         res.setHeader("Cache-Control", `public, max-age=${15 * 60}`)
  //       }
  //     }
  //   }
  // }

  // TODO: Verify this works right
  render: {
    // TODO: Remove this ssr block?
    // Uncomment this line to force static generation and run with the service worker. Default: true for universal mode and false for spa mode
    // ssr: false,
    http2: {
      push: true,
      // TODO: Customize
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
          .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    },
    // https://nuxtjs.org/api/configuration-render/#static
    // https://www.npmjs.com/package/serve-static
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
        // TODO: Use immutable - https://www.npmjs.com/package/serve-static
        // TODO: Customize - https://www.npmjs.com/package/serve-static
        // if (serveStatic.mime.lookup(path) === 'text/html') {
        //   // Custom Cache-Control for HTML files
        //   res.setHeader('Cache-Control', 'public, max-age=0')
        //   return
        // }
      }
    },
    dist: {}
    /*
      TODO: Enable content-security-policy hashes when the safari 10 rangerequest bug is fixed

      https://nuxtjs.org/api/configuration-render/#csp
      https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

      Example from docs: https://nuxtjs.org/api/configuration-render/#csp

      The following example allows Google Analytics, LogRocket.io, and Sentry.io
      for logging and analytic tracking.

      Review to this blog on Sentry.io
      https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations
      To learn what tracking link you should use.

      const PRIMARY_HOSTS = `loc.example-website.com`
      export default {
        csp: {
          reportOnly: true,
          hashAlgorithm: 'sha256',
          policies: {
            'default-src': ["'self'"],
            'img-src': ['https:', '*.google-analytics.com'],
            'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
            'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS],
            'script-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS, 'sentry.io', '*.sentry-cdn.com', '*.google-analytics.com', '*.logrocket.io'],
            'connect-src': [PRIMARY_HOSTS, 'sentry.io', '*.google-analytics.com'],
            'form-action': ["'self'"],
            'frame-ancestors': ["'none'"],
            'object-src': ["'none'"],
            'base-uri': [PRIMARY_HOSTS],
            'report-uri': [
              `https://sentry.io/api/<project>/security/?sentry_key=<key>`
            ]
          }
        }
      }

    */
    // csp: {
    //   hashAlgorithm: 'sha256',
    //   policies: {
    //     'script-src': [
    //       'https://www.google-analytics.com',
    //       'https://name.example.com'
    //     ],
    //     'report-uri': [
    //       'https://report.example.com/report-csp-violations'
    //     ]
    //   },
    //   addMeta: true
    // }
    // Permissive CSP for now
    // csp: {
    //   policies: {
    //     'default-src': ['unsafe-inline', 'unsafe-eval'],
    //   },
    //   addMeta: true
    // }
  }
}
