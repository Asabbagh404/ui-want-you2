<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApi } from '../stores/api'
import IconSearch from '@/components/icons/IconSearch.vue'
import VInput from '@/components/design-system/VInput.vue'
import ProductCard from '@/components/ProductCard.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import { computed, onMounted, ref } from 'vue'
import Dropdown from 'primevue/dropdown'

const store = useApi()
const { products } = storeToRefs(store)

const productSearch = ref<String | null>(null)
const soryByOptions = ['Price', 'Name']
const selectedSortBy = ref<String | null>(soryByOptions[0])
const currentPage = ref(1)

const productSorted = computed(() => {
  if (!products.value.data) return []
  if (selectedSortBy.value === 'Price') {
    return products.value.data.sort((a, b) => a.price - b.price)
  }
  return products.value.data.sort((a, b) => a.title.localeCompare(b.title))
})

const productsFiltered = computed(() => {
  if (!productSearch.value || !productSorted.value) return products.value.data
  return productSorted.value.filter((product) => {
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
    <div class="flex justify-between">
      <VInput v-model="productSearch" placeholder="Search products by name or keyword..." class="!w-[400px]">
        <template #icon>
          <IconSearch />
        </template>
      </VInput>
      <div class="flex gap-2">
        Sort by:
        <Dropdown v-model="selectedSortBy" class="md:w-[14rem] flex items-center" :options="soryByOptions"
          :placeholder="'Sort by:' + selectedSortBy" />
      </div>
    </div>
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
