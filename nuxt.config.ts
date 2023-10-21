// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      link:[{
        rel:"icon",
         type:"image/png",
          href:"/favicon.png",
           sizes:"48x48"
      }]
    }
  },
  devtools:{enabled:false},
  modules: ['@nuxt/ui','@nuxtjs/color-mode','@nuxtjs/supabase','@pinia/nuxt'],
  supabase:{
    redirectOptions: {
    login: '/login',
    callback: '/',
    exclude: ['/','/register','/confirm'],
  }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  

})
