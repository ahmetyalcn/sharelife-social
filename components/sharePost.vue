<script setup>
const supabase = useSupabaseClient()
const toast = useToast()
const store = useMainStore();
const uploading = ref(false)
const pcPath = ref("")
const isOpen = ref(false)

const { data: { session }, } = await supabase.auth.getSession()

const post = reactive({
    shared_text: "",
    shared_photo: "",
    profile_id: session.user.id
});

async function sendData() {
    if (post.shared_text.length > 9) {
        const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select()

        if (data) {
            isOpen.value = false
            post.shared_text = ""
            post.shared_photo = ""
            pcPath.value = ""
            toast.add({ title: "Successfully posted", timeout: 1000, color: "green" })
            console.log('data', data)
            store.getAllPosts()
        }
    }else{
        toast.add({ title: "Text should be minimum 10 characters", timeout: 1000, color: "red" })
    }

}

async function uploadPhoto(event) {
    uploading.value = true
    const file = event.target.files[0];
    if (file) {
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(`posts/${file.name}_${Date.now()}`, file);
        if (data) {
            console.log('Photo uploaded:', data);
            post.shared_photo = "https://aravmhezjrpmloycmqbt.supabase.co/storage/v1/object/public/avatars/" + data.path;
            console.log('post.shared_photo', post)

            toast.add({ title: "Successfully upload", timeout: 1000, color: "green" })
           

        } else {
            console.error('Photo upload error:', error);
          
        }

    }
  uploading.value = false;
}



</script>
<template>
    <div>

        <img src="/newpost.svg" width="60" alt="" class="right-5 fixed bottom-5 cursor-pointer"
            @click="isOpen = true">
        <UModal v-model="isOpen" :ui="{ base: ' justify-center flex md:w-1/2', container: 'items-center' }">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

                <div class="p-2 border-pink-800 flex flex-col items-end">

                    <UInput v-model="post.shared_text" class="w-full mb-2" color="pink" icon="i-heroicons-pencil-square"
                        placeholder="Write something.." size="lg" />

                    <UInput @change="uploadPhoto" v-model="pcPath" type="file" color="pink" class="w-full" size="lg"
                        placeholder="Add new note.." />
                    <UButton :loading="uploading"
                        class=" dark:text-white dark:bg-pink-700 hover:bg-pink-400 bg-pink-700 text-white m-1 px-10 w-auto text-center "
                        @click="sendData">{{ uploading ? "Uploading.." : "Confirm" }}</UButton>
                </div>

            </UCard>
        </UModal>
    </div>
</template>