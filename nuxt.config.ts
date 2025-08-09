// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    baseURL: '/', // ✅ no subpath
  }, 
  
runtimeConfig: { public: { apiBase: 'https://cat.megumin.dev/api', } }
,

    nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'], // add other routes if needed
    },
    },



})
