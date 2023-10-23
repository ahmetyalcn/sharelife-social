<template>
    <div class="flex gap-2 px-4 sm:py-2 overflow-x-auto w-screen md:w-auto mb-2">
        <div class="relative border-r-2 pr-2 border-pink-700 cursor-pointer">
            <UAvatar class=" border-2 relative border-pink-700 box-content"  size="xl" :src="store.profile.avatar_url" /> 
            <img src="newstory.svg" class="w-6 border-2 border-pink-700 bg-pink-700 rounded-full absolute bottom-3 right-1" alt="">
            
        </div>
       
        <div v-for="i in 10" class="flex flex-col justify-center items-center font-semibold " >
            <UAvatar class=" border-2 border-pink-700 box-content cursor-pointer" :key="index" size="xl" :src="store.profile.avatar_url" />
            <small>@{{ store.profile.username }}</small>
        </div>

    </div>
</template>
<script setup>

const store = useMainStore()
const props = defineProps(
    ["posts"]
)
</script>