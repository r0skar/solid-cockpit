import NProgress from 'nprogress'
import PCancelable from 'p-cancelable'

/**
 * Returns a function that does nothing and returns nothing.
 */
export const noop = () => {}

/**
 * Detects whether  we are in the `dev` environment.
 */
export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

/**
 * Sleeps for `n` milliseconds.
 */
export const sleep = (n: number) => {
  return new Promise(r => setTimeout(r, n))
}

/**
 * Awaits the next animation frame.
 */
export const nextFrame = () => {
  return new Promise(requestAnimationFrame)
}

/**
 * Strips all HTML tags from a string.
 */
export const stripTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, '')
}

/**
 * Encodes a string with `base64`.
 */
export const encodeBase64 = (str: string) => {
  return window.btoa(unescape(encodeURIComponent(str)))
}

/**
 * Decodes a `base64` string.
 */
export const decodeBase64 = (str: string) => {
  return decodeURIComponent(escape(window.atob(str)))
}

/**
 * Truncates a given string to 150 chars (including dots).
 */
export const truncate = (str: string, length = 150, addDots = true) => {
  const dots = addDots && str.length > length ? '...' : ''
  return str.substring(0, length - dots.length) + dots
}

/**
 * Creates a new progress bar.
 */
export const useProgressBar = () => NProgress.configure({
  minimum: 0.2,
  showSpinner: false
})

/**
 * Creates an abortable promise.
 */
export const createAbortablePromise = <T = unknown>(
  promiseFn: () => Promise<T>,
  cancelReason = 'Promise has been canceled',
  errorMessage = 'Promise has failed'
) => {
  return new PCancelable<T>((resolve, reject, onCancel) => {
    // eslint-disable-next-line no-param-reassign
    onCancel.shouldReject = false
    promiseFn().then(resolve).catch(() => reject(errorMessage))
    onCancel(() => reject(cancelReason))
  })
}
