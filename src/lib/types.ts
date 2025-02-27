/**
 * Script function.
 */
export type Script = () => Promise<void>

/**
 * Generic object interface.
 */
export interface AnyObject extends Record<string, any> {}
