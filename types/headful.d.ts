/* eslint-disable import/no-default-export */
declare module 'headful' {
  export interface HeadProps {
    html?: string | Record<string, unknown>
    head?: string | Record<string, unknown>
    title?: string
    description?: string
    keywords?: string
    image?: string
    lang?: string
    ogLocale?: string
    url?: string
  }

  type Headful = (props: HeadProps) => void

  const headful: Headful

  export default headful
}
