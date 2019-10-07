import { modularScale, transparentize } from 'polished'

export const scale = (steps: number) => modularScale(steps, '1rem')

export const colors = {
  text: '#111',
  bg: '#f0eded',
  brand: '#cd1622',
  error: '#e53e3e',
  success: '#3ee592',
  subtle: transparentize(0.5)('#111')
}

export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1280px'
}

export const textSize = {
  sm: scale(-0.5),
  normal: scale(0),
  md: scale(1),
  lg: scale(1.5),
  xl: scale(3)
}

export const fontWeight = {
  thin: 320,
  normal: 460,
  bold: 600
}

export const leading = {
  tight: 1.3,
  normal: 1.6,
  wide: 1.9
}

export const tracking = {
  tight: '-0.05em',
  normal: 'normal',
  wide: '0.05em'
}
