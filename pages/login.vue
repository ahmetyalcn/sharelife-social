<template>

        <LoginForm/>

</template>
<script setup>
definePageMeta({
        middleware:"auth"
})
</script>