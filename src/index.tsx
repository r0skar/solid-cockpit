import { render } from 'solid-js/dom'
import { forceRenderStyles } from 'typestyle'
import { createGlobalStyles } from 'App/design/app'
import { App } from 'App/components/App'

const anchor = document.getElementById('app')

if (anchor) {
  createGlobalStyles()
  forceRenderStyles()
  render(() => <App />, anchor)
}
