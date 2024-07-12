<script lang="ts" setup>
import { defineProps } from 'vue'

const model = defineModel()
const props = defineProps<{
  placeholder?: string,
}>()

</script>

<template>
  <div class="relative flex">
    <slot name="icon"></slot>
    <input v-model="model" :placeholder="props.placeholder"
      class="pl-3 w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-darkgray" />
  </div>
</template>