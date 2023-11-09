import LRU from 'lru-cache'

export function createCache<T>(size = 500): Map<string, T> & { max?: number } {
  if (__GLOBAL__ || __ESM_BROWSER__) {
    return new Map<string, T>()
  }
  // 看了下 LRU 的源码，emmm  本质也是使用的 Map，并没有时间上的优化
  const cache = new LRU(size)
  // @ts-expect-error
  cache.delete = cache.del.bind(cache)
  return cache as any as Map<string, T>
}
