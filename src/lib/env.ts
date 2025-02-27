import 'dotenv/config'

export const getEnv = <T = string>(key: string, defaultValue?: T): T => {
  const value = process.env[key] || defaultValue
  if (value === undefined) throw new Error(`Environment variable ${key} is not defined`)
  return value as T
}

export const Env = {
  /**
   * Set to `true` when GitHub Actions is running a workflow.
   * @default false
   */
  GITHUB_ACTIONS: getEnv<boolean>('GITHUB_ACTIONS', false),
  /**
   * Current Node.js environment.
   * @default 'development'
   */
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  /**
   * Shopify custom application access token.
   */
  SHOPIFY_ACCESS_TOKEN: getEnv('SHOPIFY_ACCESS_TOKEN'),
  /**
   * Shopify store domain.
   */
  SHOPIFY_SHOP_NAME: getEnv('SHOPIFY_SHOP_NAME'),
  /**
   * WooCommerce consumer key.
   */
  WOOCOMMERCE_CONSUMER_KEY: getEnv('WOOCOMMERCE_CONSUMER_KEY'),
  /**
   * WooCommerce consumer secret.
   */
  WOOCOMMERCE_CONSUMER_SECRET: getEnv('WOOCOMMERCE_CONSUMER_SECRET'),
  /**
   * URL of the WooCommerce store.
   */
  WOOCOMMERCE_URL: getEnv('WOOCOMMERCE_URL'),
}
