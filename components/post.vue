<script setup>
const { post } = defineProps(["post"])
const store = useMainStore()
const { formatDate } = useUtils()
const toast = useToast()
const supabase = useSupabaseClient()


const { data: { session }, } = await supabase.auth.getSession();

const likePost = async (post) => {
    console.log('post.likes', post)
    const like = post.likes.find(obj => obj.profile_id === session.user.id);


    if (like) {
        const likeIndex = post.likes.indexOf(like);
        post.likes.splice(likeIndex, 1);
        const { data, error } = await supabase
            .from("likes")
            .delete()
            .eq('profile_id', like.profile_id)
            .eq('post_id', post.id)

    } else {


        if (session?.user) {
            post.likes.push({ profile_id: session.user.id });

            console.log('liked', post)
            await supabase
                .from("likes")
                .insert({
                    profile_id: session.user.id,
                    post_id: post.id
                }).then(() => console.log('post.likes', post))


        } else {
            toast.add({ title: 'You must to login for like this content', timeout: 1000, color: "blue" })

        }
    }



}

</script>
<template>
    <div class="my-3">
        <span> {{ post.shared_text }}</span>
        <img v-if="post.shared_photo" class="rounded-lg w-full border-2 mt-4 object-cover h-60 cursor-pointer"
            @click="store.openPostModal(post)" :src="post.shared_photo" alt="">

        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
            <div class="flex gap-2">
                 <p v-if="!!post.likes.find(like => like.profile_id === session?.user.id)" @click="likePost(post)"
                class="bg-pink-700 border-2 text-white rounded-full w-auto p-2 cursor-pointer h-8 flex justify-center items-center">
                <i class="i-heroicons-hand-thumb-up  text-2xl"></i>&nbsp;{{ post.likes.length }}
            </p>


            <p v-else @click="likePost(post)"
                class=" border-2 rounded-full w-auto p-2 h-8 flex border-pink-700 cursor-pointer justify-center items-center text-pink-700"><i
                    class="i-heroicons-hand-thumb-up bg-pink-700 dark:bg-pink-700  text-2xl"></i>&nbsp;{{ post.likes.length
                    }}
            </p>

            <p @click="store.openPostModal(post)"
                class=" border-2 rounded-full w-auto p-2 h-8 flex cursor-pointer justify-center items-center border-green-600 text-green-600 dark:text-green-600"><i
                    class="i-heroicons-chat-bubble-oval-left-ellipsis bg-green-600  dark:bg-green-600 text-2xl"></i>&nbsp;{{ post.comments.length
                    }}
            </p>
            </div>
           

            <p>{{ formatDate(post.shared_date) }}</p>
          
        </div>
  
    </div>
</template>
