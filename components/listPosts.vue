<script setup >
const posts = ref([])
const store = useMainStore()

watch(()=>store.allPosts ,async(all)=> {
   posts.value = all;
});   



const getItems = (post) => {
    const items = [
        [{
            label: 'Edit',
            icon: "i-heroicons-pencil-square",
            disabled: true

        },
        {
            label: 'Delete',
            class: "text-red-500 font-semibold ",
            click: () => { store.deletePostById(post.id, post.shared_photo) },
            icon: "i-heroicons-trash",

        }]
    ]
    return items;
}

</script>

<template>
    <div>
        <ul class=" border-t-2 border-pink-700">
            <li v-for="(post, index) in posts" :key="index"
                class="sm:border-l-2 sm:border-r-2 border-b-2 border-pink-700">
                <div class="px-4 py-2">
                    <div class="flex justify-between">

                        <nuxt-link class="flex items-center gap-2" :to="'/profile/' + post.profiles.id">
                            <UAvatar :src="post.profiles.avatar_url" />
                            <span class="font-bold"> @{{ post.profiles.username }}</span>
                        </nuxt-link>

                        <UDropdown v-if="post.profiles.id === store.profile.id" :items="getItems(post)" mode="hover"
                            :ui="{ width: 'w-24', }" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="" trailing-icon="i-heroicons-ellipsis-horizontal" />
                        </UDropdown>
                    </div>
                   <Post :post="post"/>

                </div>

            </li>
        </ul>
    </div>
</template>

<style>
.i-heroicons-trash {
    background-color: red !important;
}
</style>