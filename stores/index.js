export const useMainStore = defineStore("main", () => {

  const fetchedData = ref({});
  const profile = ref({});
  const supabase = useSupabaseClient()
  const router = useRouter();
  const isLogged = ref(false);
  const toast = useToast()
  const allPosts = ref([])

  onMounted(async () => {
    const { data: { session }, } = await supabase.auth.getSession()
    if (session) {
      isLogged.value = true;

    }
    getUser();
    getAllPosts()

  })

  async function getAllPosts() {
    let { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*),likes(*)')
      .order('shared_date', { ascending: false })
    if (data) {
      allPosts.value = data
      console.log('allPosts', allPosts.value)
    }

  }
  async function login(login) {
    try {
      let { data, error } = await supabase.auth.signInWithPassword(login)
      if (data.user) {
        isLogged.value = true;
        getUser().then((res) => {
          toast.add({ title: 'Successfully logged in!', timeout: 1000, color: "green" })
          if (!profile.value.username) {
            router.push("/profile/edit")
          } else {
            router.push("/")
          }
        })
      } else {
        toast.add({ title: error.message, color: "red" })
      }
    } catch (error) {
      toast.add({ title: 'Login information is not correct', timeout: 1000, color: "red" })
    }


  };
  async function getUserById(id) {
    const response = await supabase
      .from('profiles')
      .select('*, posts(*)')
      .eq('id', id)

    return response.data[0]
  }
  async function deletePostById(id, imageUrl) {
    const response = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    const path = imageUrl.split("https://aravmhezjrpmloycmqbt.supabase.co/storage/v1/object/public/avatars/");

    const response2 = await supabase
      .storage
      .from('avatars')
      .remove([path[1]])
    if (response2.data) {
      toast.add({ title: "Post is deleted", timeout: 1000, color: "blue" })
      getAllPosts()
    }

  }
  async function getUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {

        fetchedData.value = user;
        const response = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)

        if (response.data && response.data.length > 0) {
          profile.value = { ...response.data[0], email: user.email }
        } else {
          console.error('Profile information not found');
        }
      }
      return profile.value;
    } catch (error) {
      console.error('User information can not fetched', error);
    }
  }

  async function signOut() {
    try {
      let { error } = await supabase.auth.signOut()
        .then(res => {
          profile.value = {}
          isLogged.value = false;
          toast.add({ title: 'Log outed!', timeout: 1000, color: "green" })
        })
        .then(res => router.push("/login"));
    } catch (error) {
      console.log('error', error)
    }


  }

  

  return { login, profile, signOut, isLogged, getUser, getAllPosts, allPosts, getUserById, deletePostById }

})