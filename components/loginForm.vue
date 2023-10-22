<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
const state = ref({
    email: "",
    password: ""
})
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}
const store = useMainStore()
</script>
<template>
    <div class="flex justify-center items-start pt-10 h-full">
        <div class="w-full max-w-xl h-auto sm:border-2 border-pink-400 rounded-md p-5">
            <h1 class="text-3xl font-bold">Login</h1>
            <br>
            <UForm :validate="validate" :state="state" @submit="store.login(state)">
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
            <p class="text-sm text-gray-400 font-normal text-center p-5">Don't have an account yet? <nuxt-link class="dark:text-white text-black font-semibold" to="/register">Register</nuxt-link></p>

        </div>

    </div>
</template>
<style></style>