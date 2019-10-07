export type RepeaterField<T = unknown> = { field: Field; value: T }[]

export type DataType = 'collections' | 'singletons'

export interface Field {
  type: string
  label: string
}

export interface ImageFile {
  path: string
}

export interface VideoLink {
  url: string
  id: string
  provider: string
  asset_id: string
  text: string
}

export interface Singleton {
  _by: string
  _mby: string
}

export interface CollectionItem extends Singleton {
  _id: string
  _created: number
  _modified: number
}

export interface SiteConfig extends Singleton {
  name: string
  lang: string
  description: string
  social_image: ImageFile
}

export interface CockpitImageProps {
  src: string
  height?: number
  width?: number
  filters?: string[]
}

/**
 * Dynamically manipulate an image hosted on S3.
 * Note: specifying `0` for either width or height, will set it to `auto`.
 * @see https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/appendix-d.html
 */
export const cockpitImage = (props: CockpitImageProps) => {
  const { src, width = 0, height = 0, filters = [] } = props
  const url = process.env.POI_APP_COCKPIT_ASSETS_URL

  if (!url || !src.startsWith(url)) {
    return src
  }

  const srcPath = src.replace(`${url}/`, '')
  const dimensions = `${width}x${height}`
  const filterMap = !filters || filters.length === 0 ? '' : `filters${filters.map(f => `:${f}`)}`

  return `${url}/${dimensions}/${filterMap}/${srcPath}`
}
