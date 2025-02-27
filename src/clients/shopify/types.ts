export interface ShopifyProduct {
  body_html: string | null
  created_at?: string
  handle?: string
  id?: number
  image?: ShopifyImage
  images?: ShopifyImage[]
  metafields_global_description_tag?: string
  metafields_global_title_tag?: string
  options?: {
    id: number
    name: string
    position: number
    product_id: number
    values: string[]
  }[]
  product_type?: string
  published_at?: string
  published_scope?: string
  status?: 'active' | 'archived' | 'draft'
  tags?: string
  template_suffix?: string | null
  title: string
  updated_at?: string
  variants?: ShopifyProductVariant[]
  vendor?: string
}

export interface ShopifyProductVariant {
  barcode?: string
  compare_at_price?: string | null
  created_at?: string
  fulfillment_service?: string
  grams?: number
  id?: number
  image_id?: number | null
  inventory_item_id?: number
  inventory_management?: string
  inventory_policy?: 'deny' | 'continue'
  inventory_quantity?: number
  old_inventory_quantity?: number
  option1?: string | null
  option2?: string | null
  option3?: string | null
  position?: number
  presentment_prices?: {
    price?: {
      amount?: number | string
      currency_code?: string
    }
    compare_at_price?: {
      amount?: number | string
      currency_code?: string
    }
  }[]
  price?: string
  product_id?: number
  requires_shipping?: boolean
  sku?: string
  tax_code?: string | null
  taxable?: boolean
  title: string
  updated_at?: string
  weight?: number
  weight_unit?: 'g' | 'kg' | 'oz' | 'lb'
}

export interface ShopifyImage {
  alt?: string | null
  created_at?: string
  height?: number
  id?: number
  position?: number
  product_id?: number
  src: string
  updated_at?: string
  variant_ids?: number[]
  width?: number
}

export interface ShopifyCollection {
  body_html?: string | null
  handle: string
  id?: number
  image?: ShopifyImage
  metafield?: ShopifyObjectMetafield
  published?: string
  published_at?: string
  published_scope?: string
  sort_order?: 'alpha-asc' | 'alpha-desc' | 'best-selling' | 'created' | 'created-desc' | 'manual' | 'price-asc' | 'price-desc'
  template_suffix?: string | null
  title: string
  updated_at?: string
}

export interface ShopifyObjectMetafield {
  description?: string | null
  key?: string
  namespace?: string
  value: string | number
  value_type: 'string' | 'integer'
}

export interface ShopifyCollect {
  collection_id: number
  featured?: boolean
  position?: number
  product_id: number
  sort_value?: string
}
