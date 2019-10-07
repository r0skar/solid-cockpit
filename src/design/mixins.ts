import { types } from 'typestyle'
import { colors, scale, leading, fontWeight, textSize } from './theme'

const header = (fontSize: string, mb?: boolean): types.NestedCSSProperties => ({
  lineHeight: leading.tight,
  marginBottom: mb ? scale(1) : undefined,
  fontSize
})

export const h1 = (mb?: boolean) => header(textSize.xl, mb)
export const h2 = (mb?: boolean) => header(textSize.lg, mb)
export const h3 = (mb?: boolean) => header(textSize.md, mb)
export const h4 = (mb?: boolean) => header(textSize.normal, mb)

export const intro = (): types.NestedCSSProperties => ({
  fontSize: textSize.md,
  lineHeight: leading.wide,
  $nest: {
    '& em': {
      color: colors.brand
    }
  }
})

export const subtle = (): types.NestedCSSProperties => ({
  color: colors.subtle,
  fontVariant: 'petite-caps',
  fontWeight: fontWeight.bold
})

export const hideScrollbar = (): types.NestedCSSProperties => ({
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  $nest: { '&::-webkit-scrollbar': { display: 'none' } }
})

export const truncate = (maxWidth = '100%'): types.NestedCSSProperties => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth
})

export const force3d = (willChange = 'opacity, transform'): types.NestedCSSProperties => ({
  backfaceVisibility: 'hidden',
  transform: 'translate3d(0, 0, 0)',
  willChange
})

export const cover = (zIndex = 1): types.NestedCSSProperties => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flex: 1,
  objectFit: 'cover',
  height: '100%',
  width: '100%',
  zIndex
})

export const inlineList = (spacing = 0): types.NestedCSSProperties => ({
  display: 'inline-grid',
  gridAutoFlow: 'column',
  gridColumnGap: scale(spacing)
})

export const scrollShadow = (intensity = 0.2, color = colors.bg): types.NestedCSSProperties => ({
  background: `
    linear-gradient(${color} 30%, transparent),
    linear-gradient(transparent, ${color} 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0,${intensity}), transparent),
    radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,${intensity}), transparent) 0 100%`,
  backgroundAttachment: 'local,local,scroll,scroll',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px,100% 40px,100% 14px,100% 14px'
})

export const article = (maxWidth = '60ch', centered = false): types.NestedCSSProperties => ({
  marginLeft: centered ? 'auto' : 0,
  marginRight: centered ? 'auto' : 0,
  maxWidth,
  $nest: {
    '& > *:first-child': {
      marginTop: 0
    },
    '& > *:last-child': {
      marginBottom: 0
    },
    '& .sticky': {
      display: 'block',
      marginTop: `calc(${scale(1)} * -1)`,
      marginBottom: scale(1)
    },
    '& h1, & h2, & h3, & h4': {
      marginTop: scale(2)
    },
    '& h1, & .h1': h1(true),
    '& h2, & .h2': h2(true),
    '& h3, & .h3': h3(true),
    '& h4, & .h4': h4(true),
    '& p, & ul, & ol, & img, & table': {
      marginBottom: scale(3)
    },
    '& ul, & ol': {
      marginLeft: scale(0),
      listStyleType: 'disc'
    },
    '& li:not(:last-child)': {
      marginBottom: scale(-2)
    },
    '& img': {
      display: 'block',
      maxWidth: '100%',
      objectFit: 'contain'
    },
    '& a': {
      color: colors.brand,
      textDecoration: 'underline'
    },
    '& em': {
      fontVariant: 'petite-caps'
    }
  }
})
