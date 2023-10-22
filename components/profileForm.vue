<template>
    <div class="flex justify-center items-start pt-10 h-screen">
      <div class="w-full max-w-xl h-auto border-2 rounded-md p-5">
        <h1 class="text-3xl font-bold">Update your information</h1>
        <br />
        <UForm @submit="submit">
          <UFormGroup label="Username" name="username" class="text-3xl">
            <UInput v-model="profile.username" type="text" />
          </UFormGroup>
          <UFormGroup label="Full name" name="fullname" class="text-3xl">
            <UInput v-model="profile.full_name" type="text" />
          </UFormGroup>
          <UFormGroup label="Avatar Url" name="avatarUrl" class="text-ll">
            <input type="file" @change="uploadAvatar" />
          </UFormGroup>
          <UFormGroup label="Website" name="website" class="text-3xl">
            <UInput v-model="profile.website" type="text" />
          </UFormGroup>
  
          <br />
          <UButton type="submit">Submit</UButton>
        </UForm>
        <p class="text-sm text-gray-400 font-normal text-center p-5">
          You want to update later? <nuxt-link class="text-black font-semibold" to="/">Skip</nuxt-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const supabase = useSupabaseClient()
  const store = useMainStore()
  const router = useRouter()
  
  
  const profile = ref({
  username:null,
  full_name:null,
  avatar_url:null,
  website:null
  

  })
  
onMounted(async()=>{
  const veri = await store.getUser();
   profile.value={
    username:veri.username ?? null,
    full_name: veri.full_name ?? null,
    avatar_url: veri.avatar_url ?? null,
    website: veri.website ?? null
  }
 
})

  async function submit(event) {
    console.log('profile.value', profile.value)
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile.value)
      .select()
  
    if (data) {
      store.getUser()
      store.getAllPosts()
      router.push('/')
    }
  }
  

  async function uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`avatars/${file.name}_${Date.now()}`, file);
      if (data) {
        profile.value.avatar_url = "https://aravmhezjrpmloycmqbt.supabase.co/storage/v1/object/public/avatars/"+data.path; 
      } else {

      }
    }
  }
  </script>
  
