<script setup lang="ts">
import Button from 'primevue/button'
const props = defineProps<{ label: String, icon?: String, onClick: Function }>()
</script>

<template>
  <Button
    pt:root="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2 text-white font-bold text-lg"
    pt:label="text-white font-bold text-lg" pt:icon="text-white text-xl" v-bind="props" />
</template>
