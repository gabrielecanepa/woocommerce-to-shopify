import { shopifyClient } from './client'
import type { ShopifyCollect, ShopifyCollection, ShopifyProduct } from './types'

export const createProduct = (product: ShopifyProduct) => shopifyClient.product.create(product)

export const createCollection = (collection: ShopifyCollection) => shopifyClient.customCollection.create(collection)

export const addProductToCollection = (collect: ShopifyCollect) => shopifyClient.collect.create(collect)
