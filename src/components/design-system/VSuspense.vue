<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean,
  error: any,
}>()
</script>


<template>
  <template v-if="props.isLoading">
    <slot name="fallback">
      <p>Loading...</p>
    </slot>
  </template>
  <template v-else-if="props.error">
    <slot name="error">
      <p>Error: {{ props.error }}</p>
    </slot>
  </template>
  <slot></slot>
</template>