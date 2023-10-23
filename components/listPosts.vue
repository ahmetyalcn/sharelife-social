<template>
    <div>
        <ul class=" border-t-2 border-pink-700">
            <li v-for="(post, index) in store.allPosts" :key="index" class="sm:border-l-2 sm:border-r-2 border-b-2 border-pink-700">
                <div class="px-4 py-2">
                    <div class="flex justify-between">

                        <nuxt-link class="flex items-center gap-2" :to="'/profile/' + post.profiles.id">
                            <UAvatar :src="post.profiles.avatar_url" />
                            <span class="font-bold"> @{{ post.profiles.username }}</span>
                        </nuxt-link>
            
                        <UDropdown v-if="post.profiles.id===store.profile.id" :items="getItems(post)" mode="hover" :ui="{width: 'w-24', }" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="" trailing-icon="i-heroicons-ellipsis-horizontal" />
                        </UDropdown>
                    </div>
                    <div class="my-3">
                        <span> {{ post.shared_text }}</span>
                        <img v-if="post.shared_photo"
                            class="rounded-lg w-full border-2 mt-4 object-cover h-60 cursor-pointer"
                            @click="$props.openPostModal(post)" :src="post.shared_photo" alt="">
                        
                        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <p></p>
                            <p>{{ formatDate(post.shared_date) }}</p>
                        </div>
                    </div>

                </div>

            </li>
        </ul>
    </div>
</template>
<script setup >
const store = useMainStore()
const { formatDate } = useUtils()
defineProps(
    ["openPostModal"]
)

const getItems =(post)=>{
   const items = [
  [{
    label: 'Edit',
    icon:"i-heroicons-pencil-square",
    disabled:true
    
  },
  {
    label: 'Delete',
    class:"text-red-500 font-semibold ",
    click: ()=> {store.deletePostById(post.id,post.shared_photo)},
    icon:"i-heroicons-trash",
    
  }]
] 
return items;
}

</script>
<style>
.i-heroicons-trash{
background-color: red !important;
}
</style>