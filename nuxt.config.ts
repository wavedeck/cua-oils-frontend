// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
      exclude: ["/auth/*"],
    },
  },
});
