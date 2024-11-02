<script setup >
const store = useMainStore()


onMounted(async() => {
  await store.getAllPosts()
})

</script>
<template >
    <div class="grid md:grid-cols-3 gap-4" >

        <div></div>
        <div class="" >
            <Stories :posts="store.allPosts" />
            <ListPosts/>
            <SharePost />
            <ModalPost  />
        </div>
        <div>

        </div>
    </div>
</template>
