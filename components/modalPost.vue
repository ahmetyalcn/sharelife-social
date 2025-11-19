<template>
    <div>
        <UModal v-model="store.isOpen" :ui="{ base: ' flex md:w-1/2', container: 'items-center' }">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 ' }">
                <template #header>
                    <div class="flex justify-between">
                        <div class="flex justify-start gap-2">
                            <UAvatar size="lg" :src="store.clickedPost.profiles.avatar_url" />
                            <span class="font-bold"> @{{ store.clickedPost.profiles.username }}</span>
                        </div>
                        <UButton color="pink" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="store.isOpen = false" />

                    </div>

                    <div class="flex flex-col items-start justify-center p-4">
                        <div class="my-4">
                            <span>{{ store.clickedPost.shared_text }}</span>
                        </div>

                        <div class="flex justify-center w-full mt-4">
                            <img v-if="store.clickedPost.shared_photo" 
                                class="w-full border-2 h-full max-h-[400px]"
                                :src="store.clickedPost.shared_photo" 
                                alt="">
                        </div>
                    </div>

                    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
                        <p></p>
                        <p>{{ formatDate(store.clickedPost.shared_date) }}</p>
                    </div>
                </template>
                <span class="font-bold text-lg border-b-2">Comments</span> <br>
                <ul class="mt-4">
                    <AddComment v-if="store.isLogged" />

                    <li v-for="(comment, index) in store.clickedPost.comments" :key="index" class="flex items-center gap-4 mb-4">
                        <UAvatar size="sm" :src="comment.profiles.avatar_url" />
                        <div class="flex flex-col">
                            <span class="font-bold text-sm">@{{ comment.profiles.username }}</span>
                            <span> {{ comment.content }}</span>
                        </div>
                    </li>
                </ul>
            </UCard>
        </UModal>
    </div>
</template>
<script setup>
const store = useMainStore()
const { formatDate } = useUtils()

</script>
