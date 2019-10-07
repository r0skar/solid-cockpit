import wretch from 'wretch'
import { isEmpty } from 'lodash'
import { DataType } from 'App/lib/cockpit'
import { encodeBase64 } from 'App/lib/utils'

export interface Request {
  name: string
  type?: DataType
  useCache?: boolean
  filter?: Record<string, unknown>
}

const api = wretch(process.env.POI_APP_COCKPIT_API_URL).defaults({
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    simple: 1,
    populate: 1,
    token: process.env.POI_APP_COCKPIT_API_TOKEN
  })
}, true)

const createCacheKey = (name: string, params: object = {}) => {
  return encodeBase64(name + JSON.stringify(params))
}

const setCache = <R = Record<string, unknown>>(key: string, data: R) => {
  return window.sessionStorage.setItem(key, JSON.stringify(data))
}

const getCache = <R = unknown>(key: string) => {
  const item = window.sessionStorage.getItem(key)
  return item ? JSON.parse(item) as R : undefined
}

export const fetchData = async <R = Record<string, unknown>>(props: Request): Promise<R | undefined> => {
  const { name, filter, useCache = true, type = 'singletons' } = props
  const cacheKey = createCacheKey(name, filter)

  try {
    const cachedResult = getCache<R>(cacheKey)
    const response: R = !!cachedResult && useCache
      ? cachedResult
      : await api.url(`/${type}/get/${name}`).post(filter).json()

    if (!response || isEmpty(response)) {
      return undefined
    }

    if (useCache && !cachedResult) {
      setCache(cacheKey, response)
    }

    return response
  } catch (e) {
    console.warn('Failed to fetch data', e.status, e.text)
    return undefined
  }
}
