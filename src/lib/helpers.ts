import console from 'node:console'

import { Env } from './env'

/**
 * Logger supporting GitHub Actions annotations.
 */
export const logger = {
  error: (...data: any[]) => console.error(Env.GITHUB_ACTIONS ? '::error::' : 'Error:', ...data),
  info: (...data: any[]) => console.info(...data),
  notice: (...data: any[]) => console.info(Env.GITHUB_ACTIONS ? '::notice::' : 'Notice:', ...data),
  warn: (...data: any[]) => console.warn(Env.GITHUB_ACTIONS ? '::warning::' : 'Warning:', ...data),
}

/**
 * Sleeps for the specified number of milliseconds.
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Gets the time elapsed in seconds from a given timestamp.
 */
export const timeFrom = (from: number) => Math.round((Date.now() - from) / 1_000)
