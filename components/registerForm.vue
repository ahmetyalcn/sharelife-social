<script setup lang="ts">
const router = useRouter()
const toast = useToast()
const store = useMainStore()

import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const state = ref({
    email: undefined,
    password: undefined
})
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}
const supabase = useSupabaseClient();
async function submit(event: FormSubmitEvent<any>) {
    let { data, error } = await supabase.auth.signUp(event.data)
    if(error){
        toast.add({ title: error.message, color:"red" })
    }else{
        store.logged(true); 
        router.push("/profile/edit");
    }
}
</script>
<template>
    <div class="flex justify-center items-start pt-10 h-screen">
        <div class="w-full max-w-xl h-auto sm:border-2 border-pink-400 rounded-md p-5">
            <h1 class="text-3xl font-bold">Register</h1>
            <br>
            <UForm :validate="validate" :state="state" @submit="submit">
                <UFormGroup label="Email" name="email">
                    <UInput color="pink" v-model="state.email" />
                </UFormGroup>
                <UFormGroup label="Password" name="password" class="text-3xl">
                    <UInput color="pink" v-model="state.password" type="password" />
                </UFormGroup>
                <br>
                <UButton color="pink" type="submit">
                    Submit
                </UButton>
            </UForm>
            <p class="text-sm text-gray-400 font-normal text-center p-5">Already registered? <nuxt-link class="text-black dark:text-white font-semibold" to="/login">Log in</nuxt-link></p>
        </div>

    </div>
</template>
<style></style>