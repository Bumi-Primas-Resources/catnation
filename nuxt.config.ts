// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/catnation/' : '/',
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ,
    },
  },
  nitro: {
    preset: 'github-pages',
  },
})

