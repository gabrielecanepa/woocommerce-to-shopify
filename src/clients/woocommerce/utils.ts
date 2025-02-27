import { logger, sleep } from '@/lib/helpers'

import { wooCommerceClient } from './client'
import type { WooCommerceEntity } from './types'

const PAGINATION_LIMIT = 100
const RETRY_LIMIT = 5

/**
 * List the specified WooCommerce resources recursively.
 */
export const wooCommerceList = async <T extends WooCommerceEntity>(
  endpoint: 'products' | 'products/categories',
  objects: T[] = [],
  page = 1,
  retry = 1,
): Promise<T[]> => {
  while (true) {
    try {
      const { data } = (await wooCommerceClient.get(endpoint, { page, per_page: PAGINATION_LIMIT })) as { data: T[] }
      objects.push(...data)
      if (data.length < PAGINATION_LIMIT) break
      page++
    } catch (e) {
      const err = e as Error & { code: string }
      if (err.code !== 'ECONNRESET') throw err
      if (retry > RETRY_LIMIT) {
        logger.error('Exceeded retry limit')
        throw err
      }
      logger.info(`Connection error, retrying in 10 seconds (${retry}/${RETRY_LIMIT})`)
      await sleep(10_000)
      return wooCommerceList(endpoint, objects, page, retry + 1)
    }
  }
  return objects
}
