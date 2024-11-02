
<script setup>
const supabase = useSupabaseClient()
const toast = useToast()
const store = useMainStore();
const { data: { session }, } = await supabase.auth.getSession()
const veri = await store.getUser();


const comment = reactive({
    content: "",
    post_id: store.clickedPost.id,
    profile_id: veri.id,
   
});

async function sendData() {
    if (comment.content.length > 9) {
        const { data, error } = await supabase
            .from('comments')
            .insert(comment)
            .select()

        if (data) {
            store.clickedPost.comments.push({...comment, profiles:{
        avatar_url:store.profile.avatar_url,
        username:store.profile.username
    }})
            comment.content= "";
            toast.add({ title: "Successfully shared", timeout: 1000, color: "green" })

        }
    }else{
        toast.add({ title: "Text should be minimum 10 characters", timeout: 1000, color: "red" })
    }

}




</script>
<template>
    <div>
        <div class="p-2 border-pink-800 flex flex-row border rounded-md mb-4">

            <input v-model="comment.content" class="border-none w-full bg-transparent focus:outline-none" color="pink"
                placeholder="Add a comment.." size="lg" />
            
             
            <i class="i-heroicons-paper-airplane dark:text-white dark:bg-pink-700 hover:bg-pink-400 bg-pink-700 text-white text-xl text-center cursor-pointer"
                @click="sendData"></i>
        
        </div>
    </div>
</template>