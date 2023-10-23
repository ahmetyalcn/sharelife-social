<template>
    <div>
        <UModal v-model="$props.isOpen"  :ui="{ base: 'h-full flex md:w-1/2', container:'items-center' }">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 ' }">
                    <template #header>
                        <div class="flex justify-between">
                                    <div class="flex justify-start gap-2">
                                    <UAvatar :src="$props.clickedPost.profiles.avatar_url" />
                                    <span class="font-bold"> @{{ $props.clickedPost.profiles.username }}</span>
                                </div>
                                    <UButton color="pink" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="isOpen = false" />

                                </div>
                               
                        <div class="flex items-center justify-center">
                            <div class="p-4">
                               
                                <div class="my-4">
                                    <span> {{ $props.clickedPost.shared_text }}</span>
                                    <img class=" w-full border-2 h-full max-h-[400px] mt-4"
                                       :src="$props.clickedPost.shared_photo" alt="">
                                </div>

                            </div>
                           
                        </div>
                    </template>

                   
                </UCard>
            </UModal>
    </div>
</template>
<script setup>
defineProps(["isOpen","clickedPost"])
</script>