import { ref } from 'vue'

function generateCacheKey(key: string, args: any[]): string {
  return `${key}-${JSON.stringify(args)}`
}

export function useQuery(key: string, asyncFn: Function, options: any = {}) {
  const cache = new Map<string, any>()
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchData(...args: any[]) {
    if (cache.has(generateCacheKey(key, args))) {
      console.log('ici')
      data.value = cache.get(generateCacheKey(key, args))
      return { data, loading, error, fetchData }
    }
    loading.value = true
    try {
      data.value = await asyncFn(...args)
      cache.set(generateCacheKey(key, args), data.value)
    } catch (e: any) {
      error.value = e
    } finally {
      loading.value = false
    }

    return { data, loading, error, fetch: fetchData }
  }

  if (options.autoFetch) {
    fetchData()
  }

  return ref({ data, loading, error, fetch: fetchData })
}
