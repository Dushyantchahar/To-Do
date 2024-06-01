// Assuming this is a Nuxt 3 configuration file
import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    // '@nuxtjs/proxy',
    // Include other modules here as needed
  ],

  nitro: {
    devProxy: {
      "/api": {
          target: "http://localhost:8080/api",
          // Headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
          prependPath: true,
          changeOrigin: true,
      },
    }
  },
  // proxy: {
  //   '/api/': {
  //     target: 'http://localhost:8080',
     
  //   },
  // },

  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls: {
        },
      },
    },
  },

  css: [
    '~/assets/css/main.css',
    
    // 'vuetify/lib/styles/main.sass',
  ],

  // axios: {
  //   baseURL: 'http://localhost:8080', 
  // },

  // Register global plugins, e.g., for Axios
  plugins: [
    '~/plugins/axios.js', 
  ],
})




// // https://nuxt.com/docs/api/configuration/nuxt-config
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// export default defineNuxtConfig({
//   devtools: { enabled: true },

//   build: {
//     transpile: ['vuetify'],
//   },
//   modules: [
//     '@nuxtjs/proxy',
//   ],
//   proxy: {
//     '/api/': { 
//       target: 'http://localhost:8080', 
//       pathRewrite: { '^/api/': '/api/v1/tasks/'} 
//     },
//     // You can add more rules here
//   },

//   modules: [
//     (_options, nuxt) => {
//       nuxt.hooks.hook('vite:extendConfig', (config) => {
        
//         config.plugins.push(vuetify({ autoImport: true }))
//       })
//     },
//     //...
//   ],
//   vite: {
//     vue: {
//       template: {
//         transformAssetUrls,
//       },
//     },
//   },
//   plugins: [
//     '~/plugins/vuetify.js'
//   ],
 
//   plugins: [
//     '~/plugins/axios.js', // Make sure the path is correct
//   ],
//   css: [
//     '~/assets/css/main.css'
//   ]

// })
