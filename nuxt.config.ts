// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

    app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/catnation/', // or '/'
  },

    nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'], // add other routes if needed
    },
    },

})
