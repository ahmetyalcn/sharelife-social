<script setup>
const supabase = useSupabaseClient();
const store = useMainStore();
const router = useRouter();
const uploading = ref(false)


const profile = ref({
  profile_id: null,
  username: null,
  full_name: null,
  avatar_url: null,
  website: null


})

onMounted(async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Kullanıcı bulunamadı veya hata oluştu:', userError);
    return;
  }

  const response = await supabase
    .from('profiles')
    .select('*')
    .eq('profile_id', user.id);

  if (response.error) {
    console.error('Profil bilgileri alınırken hata oluştu:', response.error);
    return;
  }

  const veri = response.data[0];
  if (veri) {
    profile.value = {
      id: veri.id, 
      profile_id: user.id,
      username: veri.username ?? null,
      full_name: veri.full_name ?? null,
      avatar_url: veri.avatar_url ?? null,
      website: veri.website ?? null
    };
  } else {
    profile.value = {
      profile_id: user.id
    }
    console.error('Profil bulunamadı');

  }
});



async function submit(event) {

  if (profile.value.id) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username: profile.value.username,
        full_name: profile.value.full_name,
        avatar_url: profile.value.avatar_url,
        website: profile.value.website
      })
      .eq('id', profile.value.id) 
      .select();

    if (error) {
      console.error('Güncelleme sırasında hata oluştu:', error);
      return;
    }
  } else {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        profile_id: profile.value.profile_id,
        username: profile.value.username,
        full_name: profile.value.full_name,
        avatar_url: profile.value.avatar_url,
        website: profile.value.website
      })
      .select();

    if (error) {
      console.error('Yeni kayıt oluşturulurken hata oluştu:', error);
      return;
    }

    store.getUser(); 
  }

  store.getAllPosts(); 
  router.push('/');
}



async function uploadAvatar(event) {
  if (uploading.value) {
    return;
  }

  uploading.value = true;
  const file = event.target.files[0];

  if (!file) {
    uploading.value = false;
    return;
  }

  try {
    if (store.profile.avatar_url) {
      const path = store.profile.avatar_url.split("https://uwdvspydufaygysqpmlm.supabase.co/storage/v1/object/public/avatars/");
      const { data, error } = await supabase
        .storage
        .from('avatars')
        .remove([path[1]])
      if (error) {
        console.error(error.message);
        return;
      }
    } 

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`avatars/${Date.now()}_${file.name}`, file);

      if (error) {
        console.error(error.message);
        return;
      }

      if (data) {
        profile.value.avatar_url = "https://uwdvspydufaygysqpmlm.supabase.co/storage/v1/object/public/avatars/" + data.path;
      }

  } finally {
    uploading.value = false;
  }
}

</script>
  
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
        <UButton color="pink"
          class=" dark:text-white dark:bg-pink-700 hover:bg-pink-400 bg-pink-700 text-white m-1 px-10 w-auto text-center"
          :loading="uploading" type="submit">{{ uploading ? "Uploading.." : "Share" }} </UButton>
      </UForm>
      <p class="text-sm text-gray-400 font-normal text-center p-5">
        You want to update later? <nuxt-link class="text-black font-semibold" to="/">Skip</nuxt-link>
      </p>
    </div>
  </div>
</template>
  

