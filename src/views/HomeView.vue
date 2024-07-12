<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApi } from '../stores/api'
import IconSearch from '@/components/icons/IconSearch.vue'
import VButton from '@/components/design-system/VButton.vue'
import VInput from '@/components/design-system/VInput.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import { onMounted } from 'vue'

const store = useApi()

const { products } = storeToRefs(store)
onMounted(async () => {
  await products.value.fetch()
}),
</script>

<template>
  <main class="w-full">
    <ViewHeader title="Products" />
    <VInput v-model="products.search" placeholder="Search products by name or keyword..." class="!w-[400px]">
      <template #icon>
        <IconSearch />
      </template>
    </VInput>
    <VSuspense :error="products.error" :is-loading="products.loading">
      {{ products.data }}
    </VSuspense>
  </main>
</template>
