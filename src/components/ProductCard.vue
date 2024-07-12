<script lang="ts" setup>
import type { Product } from '@/stores/api'

const props = defineProps<{ product: Product }>()
</script>

<template>
  <div class="flex flex-col items-center gap-4 h-[345px] w-[300px] relative">
    <div
      class="hover:bg-primary z-100 absolute w-[300px] h-[200px] hover:opacity-20 transition-all hover:border-primary hover:border-solid hover:border-2">
    </div>
    <div class="bg-gray-primary w-[300px] h-[200px] left-0 absolute z-[-1] rounded-lg">
    </div>
    <img :src="props.product.image" :alt="props.product.title" class="h-[193px] object-cover" />

    <div class="w-full">
      <h2 class="text-lg font-bold">{{ props.product.title }}</h2>
      <p class="text-lg font-bold text-gray-primary text-left	">{{ props.product.price }}$</p>
    </div>
  </div>
</template>