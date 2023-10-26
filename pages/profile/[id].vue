<template>
    <div>
        <UModal v-model="isOpen"  :ui="{ base: 'h-full flex md:w-1/2', container:'items-center' }">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 ' }">
                    <template #header>
                        <div class="flex justify-between">
                                    <div class="flex justify-start gap-2">
                                    <UAvatar class="" :src="data.avatar_url" />
                                    <span> {{ data.username }}</span>
                                </div>
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="isOpen = false" />

                                </div>
                               
                        <div class="flex items-center justify-center">
                            <div class="p-4">
                               
                                <div class="my-4">
                                    <span> {{ clickedPost.shared_text }}</span>
                                    <img class=" w-full border-2  h-full max-h-[400px] mt-4"
                                       :src="clickedPost.shared_photo" alt="">
                                </div>

                            </div>
                           
                        </div>
                    </template>

                   
                </UCard>
            </UModal>
        <div class="grid md:grid-cols-6 gap-4">
            <div class=""></div>
            <div class="md:col-start-2 md:col-span-4 p-2">
                <section class="flex gap-10 border-2  rounded-t-lg p-2 dark:border-gray-700 items-center w-full">
                    <img :src="data.avatar_url" class="rounded-full border-2 border-pink-700 object-cover dark:border-gray-700 h-[30vw] w-[30vw] max-w-[200px] max-h-[200px]" alt="">
                    <ul class="gap-3 flex flex-col">
                        <li>
                            <p class="text-md font-bold">Username: @{{ data.username }}</p>
                        </li>
                        <li>
                            <p class="text-md">Fullname: {{ data.full_name }}</p>
                        </li>
                        <li>
                            <p class="text-md">Website: <a :href="data.website">{{ data.website }}</a> </p>
                        </li>
                    </ul>

                </section>
                <section class="flex justify-center">
                      <ul class="w-full sm:w-1/2 border-l-2 border-r-2 dark:border-gray-700">

                    <li v-for="(post, index) in data.posts" :key="index" class=" my-2 border-b-2 dark:border-gray-700">
                        <div class="py-2 px-4">
                            <div class="flex justify-start gap-2">
                                <UAvatar :src="data.avatar_url" />

                                <nuxt-link :to="'/profile/' + post.profile_id"><span> {{ data.username
                                }}</span></nuxt-link>
                            </div>
                            <div class="my-4">
                                <span> {{ post.shared_text }}</span>
                                <img v-if="post.shared_photo"
                                    class="rounded-lg w-full border-2 mt-4 object-cover h-60 cursor-pointer"
                                    @click="openPostModal(post)" :src="post.shared_photo" alt="">
                                    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <p></p>
                            <p>{{ formatDate(post.shared_date) }}</p>
                        </div>
                            </div>

                        </div>


                    </li>
                </ul>
                </section>
              

            </div>

            <div class=""></div>
        </div>


    </div>
</template>
<script setup>
const store = useMainStore()
const route = useRoute()
const data = ref({})
store.getUserById(route.params.id).then((res)=>{
    data.value = res;
})
const {formatDate}= useUtils()
const clickedPost = ref({})
const isOpen = ref(false)
onActivated(async()=>{
    const updated = await store.getUserById(route.params.id)
    data.value = updated;
 });
const openPostModal = (post) => {
    clickedPost.value = post
    isOpen.value = true
}
</script>