<template>
    <div class="w-full h-16 dark:bg-gray-900  bg-white border-b-2  flex justify-between py-2 px-2 sm:px-10 items-center">
    <nuxt-link to="/"> <img src="~/assets/logo.png" width="200" alt=""></nuxt-link>   

        <div class="flex items-center gap-4">
           <ul class="sm:flex gap-4 mr-10 hidden">
             <nuxt-link class="font-semibold border-2 p-2 border-gray-700 rounded-md" to="/">Home</nuxt-link>
    <nuxt-link class="font-semibold border-2 p-2 border-gray-700 rounded-md" :to="'/profile/'+store.profile.id">Profile</nuxt-link>
           </ul>
           
            <div v-if="store.isLogged" class="flex sm:items-center border-2 rounded-md sm:py-1 sm:px-5 border-pink-800 dark:border-gray-700 gap-2">
                <ProfileDropdown :profile="store.profile" :signOut="store.signOut" />
                <p  class="text-gray-700 dark:text-white font-bold hidden sm:block ">@{{ store.profile.username ?? "User" }}</p>
            </div>
            <div v-else class="flex items-center border-2 rounded-md py-1 px-5 border-gray-300 dark:border-gray-700 gap-2">
               <nuxt-link to="/login"><p class="text-gray-700 font-bold">Login</p></nuxt-link> 
               <nuxt-link to="/register"><p class="text-gray-700 font-bold">Register</p></nuxt-link> 
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



const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
const supabase = useSupabaseClient()
onMounted(async()=>{
    const { data: { session }, } = await supabase.auth.getSession()
   
})

</script>
