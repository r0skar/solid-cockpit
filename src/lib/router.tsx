import PCancelable from 'p-cancelable'
import headful, { HeadProps } from 'headful'
import UniversalRouter from 'universal-router'
import { createBrowserHistory, Location } from 'history'
import { View, createSignal, afterEffects, onCleanup } from 'solid-js'
import { Route } from 'App/lib/store'
import { routes, DEFAULT_ROUTE } from 'App/routing'
import { createAbortablePromise, nextFrame, noop } from 'App/lib/utils'

type RouteCallback = (el: HTMLElement) => Promise<unknown>

export interface RouteConfig {
  route?: Route
  redirect?: string
  view?: View
  head?: HeadProps
  data?: Record<string, unknown>
  beforeEnter?: RouteCallback
  beforeLeave?: RouteCallback
}

const history = createBrowserHistory()
const router = new UniversalRouter(routes)

const resolveLocation = (location: Location) => {
  return router.resolve(location).catch(() => ({} as RouteConfig))
}

const createRouteRequest = (routeRequest: () => Promise<RouteConfig>) => {
  return createAbortablePromise(routeRequest, 'Route request canceled')
}

const setRouteHead = (props: HeadProps = {}) => {
  return headful(props)
}

const findAnchorNode = (ev: MouseEvent) => {
  const isLink = (el: EventTarget | null) => (el as HTMLElement)?.localName === 'a'

  return isLink(ev.target)
    ? ev.target as HTMLAnchorElement
    : ev.composedPath().find(isLink) as HTMLAnchorElement | undefined
}

const useClickHandler = (ev: MouseEvent) => {
  const isValidClick = !ev.defaultPrevented && !(ev.metaKey || ev.altKey || ev.ctrlKey || ev.shiftKey)
  const { href, pathname, target } = findAnchorNode(ev) || {}

  if (!isValidClick || !href || href === '#' || !!target) {
    return
  }

  ev.preventDefault()

  if (pathname && href.startsWith(window.location.origin)) {
    if (history.location.pathname !== pathname) {
      history.push(pathname)
    }
  } else {
    window.open(href, '_blank', 'noopener')
  }
}

export const useRouter = () => {
  const [ progress, setProgress ] = createSignal<number>()
  const [ route, setRoute ] = createSignal<Route>()
  const [ view, setView ] = createSignal<View>()

  let routeEl!: HTMLDivElement
  let routeLeaveCb!: RouteCallback | undefined
  let routeRequest!: PCancelable<RouteConfig>

  const resolveRoute = async (location: Location) => {
    if (routeRequest) {
      routeRequest.cancel()
    }

    if (routeLeaveCb) {
      await nextFrame()
      await routeLeaveCb(routeEl)
    }

    setProgress(0)

    try {
      routeRequest = createRouteRequest(() => resolveLocation(location))

      const {
        head,
        data,
        beforeEnter,
        beforeLeave,
        redirect,
        route: resolvedRoute,
        view: resolvedView = noop
      } = await routeRequest

      if (!resolvedRoute) {
        history.replace(redirect || DEFAULT_ROUTE)
        return
      }

      const viewComponent = () => (
        <div ref={ routeEl }>
          { resolvedView({ data }) }
        </div>
      )

      setRouteHead(head)
      setProgress(1)
      setView(viewComponent)

      if (beforeEnter) {
        await nextFrame()
        await beforeEnter(routeEl)
      }

      setRoute(resolvedRoute)

      routeLeaveCb = beforeLeave
    } catch (e) {
      console.warn(e)
    }
  }

  const unsubscribeFromHistory = history.listen(resolveRoute)

  afterEffects(() => {
    resolveRoute(history.location)
    document.body.addEventListener('click', useClickHandler)
  })

  onCleanup(() => {
    unsubscribeFromHistory()
    document.body.removeEventListener('click', useClickHandler)
  })

  return {
    View: view,
    route,
    progress
  }
}
