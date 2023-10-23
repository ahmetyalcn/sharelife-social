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
                    <div class="my-3">
                        <span> {{ post.shared_text }}</span>
                        <img v-if="post.shared_photo"
                            class="rounded-lg w-full border-2 mt-4 object-cover h-60 cursor-pointer"
                            @click="$props.openPostModal(post)" :src="post.shared_photo" alt="">

                        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <p  v-if="!!post.likes.find(like => like.profile_id ===session.user.id)"
                                @click="unlikePost(post)"
                                class="bg-pink-700 border-2 text-white rounded-full w-auto p-2 cursor-pointer h-8 flex justify-center items-center"><i
                                    class="i-heroicons-hand-thumb-up  text-2xl"></i>&nbsp;{{ post.likes.length }}</p>


                            <p v-else @click="likePost(post)" class=" border-2 rounded-full w-auto p-2 h-8 flex cursor-pointer justify-center items-center"><i
                                    class="i-heroicons-hand-thumb-up  bg-black dark:bg-white text-2xl"></i>&nbsp;{{ post.likes.length }}
                            </p>
                            <p>{{ formatDate(post.shared_date) }}</p>
                        </div>
                    </div>

                </div>

            </li>
        </ul>
    </div>
</template>
<script setup >
const posts = ref([])
const store = useMainStore()

watch(()=>store.allPosts ,async(all)=> {
   posts.value = all;
console.log('posts.value', posts.value)
});   


const supabase = useSupabaseClient()
const { data: { session }, } = await supabase.auth.getSession();

const likePost = async(post)=>{
   
    const  {data, error} = await supabase
        .from("likes")
        .insert({
            profile_id:session.user.id,
            post_id: post.id
        });

       
            post.likes.push({ profile_id: session.user.id });
            console.log('posts.value', posts.value)
        
}
const unlikePost = async(post)=>{
   const like= post.likes.find(like => like.profile_id ===session.user.id)
    const  {data, error} = await supabase
        .from("likes")
        .delete()
        .eq('id',like.id)

        const likeIndex = post.likes.indexOf(like);
        post.likes.splice(likeIndex, 1);
}


const { formatDate } = useUtils()
defineProps(
    ["openPostModal"]
)

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
<style>
.i-heroicons-trash {
    background-color: red !important;
}
</style>