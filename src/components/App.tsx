import { style } from 'typestyle'
import { Component, createEffect } from 'solid-js'
import { useRouter } from 'App/lib/router'
import { force3d } from 'App/design/mixins'
import { useProgressBar } from 'App/lib/utils'
import { Store, useStore } from 'App/lib/store'

const Header: Component = () => (
  <header>
    <a href="/">Home</a>
    <a href="/parent">Parent</a>
    <a href="/parent/child">Child</a>
    <a href="/awd">NotFound</a>
  </header>
)

const Main: Component = () => {
  const [ , { SET_ROUTE } ] = useStore()
  const { View, route, progress: routerProgress } = useRouter()
  const progressBar = useProgressBar()

  createEffect(() => {
    SET_ROUTE(route())
  })

  createEffect(() => {
    const progress = routerProgress()

    if (progress === 0) {
      progressBar.start()
    } else if (progress) {
      if (progress >= 1) {
        progressBar.done()
      } else {
        progressBar.set(progress)
      }
    }
  })

  return (
    <main class={ style({
      $nest: {
        '> div': {
          ...force3d(),
          opacity: 0,
          transform: 'translateY(10px)'
        }
      }
    }) }>
      {( View )}
    </main>
  )
}

export const App: Component = () => (
  <Store>
    <Header />
    <Main />
  </Store>
)
