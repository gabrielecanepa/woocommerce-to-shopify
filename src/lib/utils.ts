import { type ShopifyCollection, type ShopifyImage, type ShopifyProduct } from '@/clients/shopify'
import { WooCommerceProductStatus, type WooCommerceProduct } from '@/clients/woocommerce'

export const extractProductCollections = (wooCommerceProducts: WooCommerceProduct[]): ShopifyCollection[] =>
  wooCommerceProducts.reduce<ShopifyCollection[]>((collections, product) => {
    if (!product.categories.length) return collections
    for (const category of product.categories) {
      if (collections.find(collection => collection.handle === category.slug)) continue
      collections.push({
        handle: category.slug,
        title: category.name,
      })
    }
    return collections
  }, [])

export const convertProducts = (wooCommerceProducts: WooCommerceProduct[]) =>
  wooCommerceProducts.map((product): ShopifyProduct => {
    const [image, ...images] = convertProductImages(product.images)
    return {
      body_html: product.description,
      handle: product.slug,
      image,
      images,
      product_type: product.type,
      published_scope: 'global',
      status: convertProductStatus(product.status),
      title: product.name,
      variants: [
        {
          fulfillment_service: 'manual',
          inventory_quantity: product.stock_quantity || 1,
          old_inventory_quantity: product.stock_quantity || 1,
          presentment_prices: [
            {
              price: {
                amount: product.price,
                currency_code: 'EUR',
              },
            },
          ],
          price: product.price,
          product_id: product.id,
          sku: product.sku,
          title: product.name,
          weight: parseInt(product.weight),
          weight_unit: 'kg',
        },
      ],
      vendor: product.attributes.find(a => a.name === 'Marchio')?.options[0] || undefined,
    }
  })

export const convertProductImages = (wooCommerceImages: WooCommerceProduct['images']): ShopifyImage[] =>
  wooCommerceImages.map(image => ({
    alt: image.name,
    id: image.id,
    src: image.src,
  }))

export const convertProductStatus = (wooCommerceStatus: WooCommerceProductStatus): ShopifyProduct['status'] => {
  if (wooCommerceStatus === WooCommerceProductStatus.Publish) return 'active'
  return 'draft'
}
