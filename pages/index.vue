<template>
    <div class="grid md:grid-cols-3 gap-4">

        <div></div>
        <div class="">
            <Stories :posts="store.allPosts" />
            <ListPosts  :openPostModal="openPostModal"/>
            <SharePost />
            <ModalPost :clickedPost="clickedPost" :isOpen="isOpen" />
        </div>
        <div>

        </div>
    </div>
</template>
<script setup >
const store = useMainStore()
const clickedPost = ref({})
const isOpen = ref(false)
onMounted(() => {
    console.log('store.getAllPosts()', store.getAllPosts())
})
const openPostModal = (post) => {
    clickedPost.value = post
    isOpen.value = true
}
</script>