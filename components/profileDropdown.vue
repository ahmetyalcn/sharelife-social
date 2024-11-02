<script setup>
const props = defineProps(
   ["profile","signOut"]
)


const items = computed(()=>(
  [
  [{
    label: props.profile.email,
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    to:"/profile/edit",
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'Profile',
    to:'/profile/'+(props.profile.id),
    icon: 'i-heroicons-user'
  }],[{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
  }]
]
))

</script>

<template>
  <UDropdown :items="items" width="w-full" mode="hover" :ui="{ width: 'w-auto', item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start'}">
    
    <UAvatar size="md" :src="props.profile.avatar_url" />

    <template #item="{ item }" >
      <div @click="item.label === 'Sign out' ? signOut() : null" class="flex justify-between w-full">
        <span   class="truncate" >{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </div>
     
    </template>
  </UDropdown>
</template>
