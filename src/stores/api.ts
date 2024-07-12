import { defineStore } from 'pinia'
import { useQuery } from '@/utils/useQuery'

const API_URL = import.meta.env.VITE_API_URL as string

export const useApi = defineStore('api', () => {
  const products = useQuery('products', async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch(API_URL + '/products')
    return response.json()
  })

  const product = useQuery('currentProduct', async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json()
  })

  return {
    products,
    product
  }
})
