<template>
    
    <div class="grid md:grid-cols-3 gap-4">
        
        <div></div>
        <ul class="border-l-2 border-r-2 ">
          
            <SharePost />
            <UModal v-model="isOpen"  :ui="{ base: 'h-full flex md:w-1/2', container:'items-center' }">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 ' }">
                    <template #header>
                        <div class="flex justify-between">
                                    <div class="flex justify-start gap-2">
                                    <UAvatar :src="clickedPost.profiles.avatar_url" />
                                    <span> {{ clickedPost.profiles.username }}</span>
                                </div>
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="isOpen = false" />

                                </div>
                               
                        <div class="flex items-center justify-center">
                            <div class="p-4">
                               
                                <div class="my-4">
                                    <span> {{ clickedPost.shared_text }}</span>
                                    <img class=" w-full border-2 h-full max-h-[400px] mt-4"
                                       :src="clickedPost.shared_photo" alt="">
                                </div>

                            </div>
                           
                        </div>
                    </template>

                   
                </UCard>
            </UModal>

            <li v-for="(post, index) in store.allPosts" :key="index" class=" my-2 border-b-2">
                <div class="p-4">
                    <div class="flex justify-start gap-2">
                        <UAvatar :src="post.profiles.avatar_url" />
                        
                      <nuxt-link :to="'/profile/' + post.profiles.id"><span> {{ post.profiles.username }}</span></nuxt-link> 
                    </div>
                    <div class="my-4">
                        <span> {{ post.shared_text }}</span>
                        <img  v-if="post.shared_photo" class="rounded-lg w-full border-2 mt-4 object-cover h-60 cursor-pointer" @click="openPostModal(post)"
                            :src="post.shared_photo" alt="">
                    </div>

                </div>


            </li>
            
        </ul>
        <div>
         
        </div>
    </div>
</template>
<script setup >
const supabase = useSupabaseClient()
const store = useMainStore()
const clickedPost = ref({})
const isOpen = ref(false)

const openPostModal = (post) => {
    clickedPost.value = post
    isOpen.value = true
}

</script>