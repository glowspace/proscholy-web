require('dotenv').config();
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import path from 'path'

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon/favicon-16x16.png'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
                integrity:
                    'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
                crossorigin: 'anonymous'
            }
        ]
    },
    messages: {
        loading: 'Načítání…',
        error_404: 'Error 404 – stránka nebyla nalezena',
        server_error: 'Chyba serveru',
        nuxtjs: '',
        back_to_home: 'Zpět na úvodní stránku',
        server_error_details:
          'Ajajaj, na našem serveru se někde stala chyba. <br>Zkuste <u><a href="/">použít vyhledávání</a></u>. <br>Chybu také můžete <u><a href="https://docs.google.com/forms/d/e/1FAIpQLSfry7CQD0vPpuC_VB7xGR6NUF2WdPUytQwX8KipKoZcIYxbdA/viewform?usp=pp_url&entry.1025781741=–&entry.456507920=500" target="_blank">nahlásit</a></u>.',
        client_error: 'Chyba',
        client_error_details:
          'Během renderování stránky došlo k chybě. Více informací najdeš v konzoli nástrojů pro vývojáře.'
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#aaa' },
    /*
     ** Global CSS
     */
    css: ['~assets/sass/app.scss'],
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
        ['@nuxtjs/google-analytics', { id: 'UA-94042414-8' }],
        '@nuxtjs/router',
        '@nuxtjs/dotenv',
        ['@nuxtjs/vuetify', { treeShake: true }]
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // '@nuxtjs/pwa',
        '@nuxtjs/apollo',
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.APP_URL
            }
        }
    },
    proxy: {
        '/api': {
            target: process.env.GRAPHQL_TARGET,
            pathRewrite: {
                '^/api': '/'
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, { isDev, isClient }) {
            if (!isDev) {
                config.plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([
                            path.join(__dirname, './pages/**/*.vue'),
                            path.join(__dirname, './layouts/**/*.vue'),
                            path.join(__dirname, './components/**/*.vue')
                        ]),
                        whitelist: ['html', 'body', 'nuxt-progress']
                    })
                )
            }
            if (isClient) {
                config.optimization.splitChunks.maxSize = 500000;
            }
        },
        extractCSS: true
    }
};
