import { Env } from '@/lib/env'
import Shopify from 'shopify-api-node'

export const shopifyClient = new Shopify({
  accessToken: Env.SHOPIFY_ACCESS_TOKEN,
  shopName: Env.SHOPIFY_SHOP_NAME,
})
