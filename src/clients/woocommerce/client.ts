import { Env } from '@/lib/env'
import WooCommerceRestApiModule from '@woocommerce/woocommerce-rest-api'

// @ts-expect-error - See https://github.com/woocommerce/woocommerce-rest-api-js-lib/issues/66
const WooCommerceRestApi = WooCommerceRestApiModule.default as typeof WooCommerceRestApiModule

/**
 * Base WooCommerce client instance.
 */
export const wooCommerceClient = new WooCommerceRestApi({
  consumerKey: Env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: Env.WOOCOMMERCE_CONSUMER_SECRET,
  url: Env.WOOCOMMERCE_URL,
  version: 'wc/v3',
})
