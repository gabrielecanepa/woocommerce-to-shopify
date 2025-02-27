import type { WooCommerceProduct, WooCommerceProductCategory } from './types'
import { wooCommerceList } from './utils'

/**
 * List all WooCommerce products.
 */
export const listProducts = async () => wooCommerceList<WooCommerceProduct>('products')

/**
 * List all WooCommerce categories.
 */
export const listCategories = async () => wooCommerceList<WooCommerceProductCategory>('products/categories')
