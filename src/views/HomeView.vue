<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApi } from '../stores/api'
import IconSearch from '@/components/icons/IconSearch.vue'
import VInput from '@/components/design-system/VInput.vue'
import ProductCard from '@/components/ProductCard.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import { computed, onMounted, ref } from 'vue'

const store = useApi()
const { products } = storeToRefs(store)
const productSearch = ref<String | null>(null)
const currentPage = ref(1)

const productsFiltered = computed(() => {
  if (!productSearch.value || !products.value.data) return products.value.data
  return products.value.data.filter((product) => {
    return product.title.toLowerCase().includes(productSearch.value.toLowerCase()) || product.category.toLowerCase().includes(productSearch.value.toLowerCase())
  })
})

const elementPerPage = 8
const productPaginated = computed(() => {
  if (!productsFiltered.value) return []
  const start = (currentPage.value - 1) * elementPerPage
  const end = start + elementPerPage
  return productsFiltered.value.slice(start, end)
})

onMounted(async () => {
  await products.value.fetch()
})
</script>

<template>
  <main class="w-full">
    <ViewHeader title="Products" />
    <VInput v-model="productSearch" placeholder="Search products by name or keyword..." class="!w-[400px]">
      <template #icon>
        <IconSearch />
      </template>
    </VInput>
    <VSuspense :error="products.error" :is-loading="products.loading">
      <div class="flex flex-wrap gap-5 mt-11">
        <template v-for="product of productPaginated" :key="product.id">
          <ProductCard :product="product" />
        </template>
      </div>
      <div class="flex justify-between" v-if="productsFiltered">
        <div class="flex gap-5 mt-11">
          {{ currentPage * elementPerPage }} - {{ currentPage * elementPerPage + 8 }} of {{ productsFiltered.length }}
        </div>
        <div class="flex justify-center gap-5 mt-11">
          <i class="pi pi-arrow-left cursor-pointer" style="font-size: 1rem" v-if="currentPage > 1"
            @click="currentPage--"></i>
          {{ currentPage }} / {{ Math.ceil(productsFiltered.length / elementPerPage) }}
          <i class="pi pi-arrow-right cursor-pointer" style="font-size: 1rem" v-if="
            currentPage * elementPerPage < productsFiltered.length
          " @click="currentPage++"></i>
        </div>
      </div>

    </VSuspense>
  </main>
</template>
