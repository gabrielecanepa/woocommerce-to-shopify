import { shopify, type ShopifyCollection, type ShopifyProduct } from '@/clients/shopify'
import { wooCommerce, type WooCommerceProduct } from '@/clients/woocommerce'
import { logger, timeFrom } from '@/lib/helpers'
import type { Script } from '@/lib/types'
import { convertProducts, extractProductCollections } from '@/lib/utils'

/**
 * Imports products from WooCommerce to Shopify.
 */
export const sync: Script = async () => {
  let time = 0
  const start = Date.now()
  const wooCommerceProducts: WooCommerceProduct[] = []

  try {
    logger.info('Fetching WooCommerce products...')
    wooCommerceProducts.push(...(await wooCommerce.listProducts()))
    time = timeFrom(start)
    logger.info(`Fetched ${wooCommerceProducts.length} products in ${time} seconds\n`)
  } catch (e) {
    logger.error('Error fetching WooCommerce products')
    logger.info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }

  try {
    logger.info('Creating products and collections on Shopify...')

    const collections = extractProductCollections(wooCommerceProducts)
    const products = convertProducts(wooCommerceProducts)
    const createdCollections: ShopifyCollection[] = []
    const createdProducts: ShopifyProduct[] = []

    for (const collection of collections) {
      try {
        createdCollections.push(await shopify.createCollection(collection))
        logger.info(`Created collection ${collection.title}`)
      } catch {
        logger.error(`Failed to create collection ${collection.title}`)
        continue
      }
    }
    if (createdCollections.length) {
      time = Date.now()
      logger.info(`Created ${createdCollections.length} collections in ${timeFrom(start) - time} seconds`)
      time = Date.now()
    }

    for (const product of products) {
      try {
        createdProducts.push(await shopify.createProduct(product))
        logger.info(`Created product ${product.title}`)
      } catch {
        logger.error(`Failed to create product ${product.title}`)
        continue
      }
    }
    if (createdProducts.length) {
      time = Date.now()
      logger.info(`Created ${createdProducts.length} products in ${timeFrom(start) - time} seconds`)
    }

    for (const wooCommerceProduct of wooCommerceProducts) {
      try {
        const product = createdProducts.find(product => product.handle === wooCommerceProduct.slug)
        if (!product) {
          logger.error(`Failed to find product ${wooCommerceProduct.name} in Shopify`)
          continue
        }
        for (const category of wooCommerceProduct.categories) {
          const collection = createdCollections.find(c => c.handle === category.slug)
          if (!collection) {
            logger.error(`Failed to find collection ${category.name} in Shopify`)
            continue
          }
          if (collection.id && product.id) {
            await shopify.addProductToCollection({
              collection_id: collection.id,
              product_id: product.id,
            })
            logger.info(`Added product ${product.title} to collection ${collection.title}`)
            continue
          }
          logger.error(`Failed to add product ${product.title} to collection ${collection.title}`)
        }
      } catch {
        continue
      }
    }

    logger.notice(`Created ${createdCollections.length} collections and ${createdProducts.length} products on Shopify`)
  } catch (e) {
    logger.error('Error creating products on Shopify')
    logger.info(`Elapsed time: ${timeFrom(start)}s`)
    throw e
  }
}
