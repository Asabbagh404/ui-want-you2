<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconBurger from '@/components/icons/IconBurger.vue'
import { useApi } from '../stores/api'
import { useUiStore } from '@/stores/uiStore'
import VButton from '@/components/design-system/VButton.vue'

const store = useApi()
const { toggleSidebar } = useUiStore()
const { products } = storeToRefs(store)

const fetchProducts = async () => {
  await products.value.fetch()
}

</script>

<template>
  <main>
    <div class="flex items-center gap-7">
      <IconBurger @click="toggleSidebar" class="cursor-pointer" />
      <h1 class="">Products</h1>
    </div>
    <VButton @click="fetchProducts" label="Fetch products" />
    <VSuspense :error="products.error" :is-loading="products.loading">
      {{ products.data }}
    </VSuspense>
  </main>
</template>
