/* eslint-disable import/no-webpack-loader-syntax */
import { cssRaw } from 'typestyle'
import { between } from 'polished'
import { colors, leading, breakpoints, fontWeight, textSize } from './theme'

import destyle from '!!raw-loader!destyle/destyle.css'
import nprogress from '!!raw-loader!nprogress/nprogress.css'

export const createGlobalStyles = () => {
  return cssRaw(`
    ${destyle}
    ${nprogress}

    *::selection {
      background-color: ${colors.brand};
      color: ${colors.bg};
    }

    #nprogress .bar {
      background: ${colors.brand};
    }

    #nprogress .peg {
      box-shadow: 0 0 10px 0 ${colors.brand}, 0 0 5px 0 ${colors.brand};
    }

    .nprogress-busy,
    .disabled {
      user-select: none !important;
      pointer-events: none !important;
      overflow: hidden !important;
    }

    small {
      font-size: ${textSize.sm};
    }

    html {
      background-color: ${colors.bg};
      color: ${colors.text};
      font-family: Inter;
      font-size: ${between('14px', '16px')};
      font-weight: ${fontWeight.normal};
      height: 100%;
      overflow-y: hidden;
      overflow-x: hidden;
    }

    body {
      font-size: 1rem;
      line-height: ${leading.normal};
    }

    #app {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 100vh;
      max-width: ${breakpoints.xl};
      margin-left: auto;
      margin-right: auto;
      width: 90vw;
    }
  `)
}
