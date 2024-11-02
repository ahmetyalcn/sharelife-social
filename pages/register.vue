<template>
    <RegisterForm/>
</template>
<script setup>
definePageMeta({
    middleware: "auth"
})
</script>