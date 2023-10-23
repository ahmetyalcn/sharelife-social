<template>
    <div class="w-full h-16 dark:bg-gray-900  bg-white  border-pink-700  flex justify-between py-2 px-2 sm:px-10 items-center">
    <nuxt-link to="/"> <img src="/logo.png" width="200" alt=""></nuxt-link>   

        <div class="flex items-center gap-4">
           <ul v-if="store.isLogged" class="sm:flex gap-4 mr-10 hidden">
             <nuxt-link class="font-semibold border-2 p-2 border-gray-700 rounded-md bg-pink-700 text-white" to="/">Home</nuxt-link>
    <nuxt-link class="font-semibold border-2 p-2 border-gray-700 rounded-md bg-pink-700 text-white" :to="'/profile/'+store.profile.id">Profile</nuxt-link>
           </ul>
           
            <div v-if="store.isLogged" class="flex sm:items-center border-2 rounded-full sm:rounded-sm sm:py-1 sm:px-5 border-pink-700 dark:border-pink-700 gap-2">
                <ProfileDropdown :profile="store.profile" :signOut="store.signOut" />
                <p  class="text-gray-700 dark:text-white font-bold hidden sm:block ">@{{ store.profile.username ?? "User" }}</p>
            </div>
            <div v-else class="flex items-center border-2 rounded-md py-1 px-5 border-pink-700 dark:border-pink-700 gap-2">
               <nuxt-link to="/login"><p class="text-pink-700 font-bold">Login</p></nuxt-link> 
               <nuxt-link to="/register" class="hidden sm:block sm:border-l-2 sm:pl-2 sm:border-pink-700"><p class="text-pink-700 font-bold">Register</p></nuxt-link> 

            </div>
            <ClientOnly>
                <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray"
                    variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
                <template #fallback>
                    <div class="w-8 h-8" />
                </template>
            </ClientOnly>
        </div>

    </div>
</template>
<script setup>
const store = useMainStore()

const colorMode = useColorMode()

const supabase = useSupabaseClient()
onMounted(async()=>{
    const { data: { session }, } = await supabase.auth.getSession()
   
})

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})


</script>
