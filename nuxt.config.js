
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', 'sizes':'32x32', href: '~/static/img/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', 'sizes':'16x16', href: '~/static/img/favicon/favicon-16x16.png' },
      { rel: 'stylesheet', type: 'text/css', 'href': "https://fonts.googleapis.com/css?family=Nunito:200,600" },
      { rel: 'stylesheet', 'href': "https://fonts.googleapis.com/icon?family=Material+Icons" },
      { rel: 'stylesheet', type: 'text/css', 'href': "https://use.fontawesome.com/releases/v5.8.1/css/all.css", 'integrity':"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf", 'crossorigin':"anonymous" }
      
      // todo: google analytics
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/sass/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // ssr: false to only include it on client-side
    { src: '~/plugins/firebase.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  apollo: {  
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:3000/api"
      }
    }
  },
  proxy: {
    '/api': {
      target: 'https://zpevnik.proscholy.cz/graphql',
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },
  /*
  ** Router
  */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({name: 'search', path: '/search', component: resolve(__dirname, 'pages/index.vue')}),
      routes.push({name: 'song', path: '/pisen/:id/:slug', component: resolve(__dirname, 'pages/pisen/_id.vue')})
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
