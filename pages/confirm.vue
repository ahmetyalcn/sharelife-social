<template>
    <div class="flex justify-center items-center">
        <p class="text-3xl font-bold">
            Confirm your account before you login
        </p> 
    </div>
</template>
<script setup>
definePageMeta({
    middleware: "confirm"
})
</script>