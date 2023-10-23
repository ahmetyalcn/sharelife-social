import { resolve } from 'path'
export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, '/'),

  },
  app:{
    head:{
      title:"ShareLife",
      meta:[
        {
           name:"viewport",
          content:"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1 user-scalable=no"
        },
        {
          name:"description",
          content:"You can share everything in here"
        }
      ],
      link:[{
        rel:"icon",
         type:"image/png",
          href:"/favicon.png",
           sizes:"48x48"
      }]
    }
  },
  devtools:{enabled:false},
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
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