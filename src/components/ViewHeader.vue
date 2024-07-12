<script lang="ts" setup>
import { defineProps } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconBurger from '@/components/icons/IconBurger.vue'

const props = defineProps<{
  title: String
}>()

const { toggleSidebar } = useUiStore()
</script>

<template>
  <div class="flex justify-between w-full mb-16">
    <div class="flex items-center gap-7">
      <IconBurger @click="toggleSidebar" class="cursor-pointer" />
      <h1 class="">{{ props.title }}</h1>
    </div>
    <div class="flex items-center gap-5">
      <IconHelp class="cursor-pointer" />
      <IconPlus class="cursor-pointer" />
    </div>
  </div>
</template>