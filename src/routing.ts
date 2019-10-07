import { View } from 'solid-js'
import { HeadProps } from 'headful'
import { TweenLite } from 'gsap/all'
import { Routes, RouteContext } from 'universal-router'
import { Route } from 'App/lib/store'
import { fetchData } from 'App/lib/api'
import { RouteConfig } from 'App/lib/router'
import { createAnimation } from 'App/lib/anime'
import { stripTags, truncate } from 'App/lib/utils'
import { SiteConfig, cockpitImage } from 'App/lib/cockpit'

export const DEFAULT_ROUTE = '/404'

const fetchView = async (name: string): Promise<View> => {
  return import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "[request]" */
    `App/views/${name}`
  ).then(c => c[name])
}

const beforeEnter = (el: HTMLElement) => {
  return createAnimation(TweenLite.to(el, 0.2, { opacity: 1, y: 0 })).play()
}

const beforeLeave = (el: HTMLElement) => {
  return createAnimation(TweenLite.to(el, 0.2, { opacity: 0, y: 10 })).play()
}

const createRouteContext = (context: RouteContext<{}, RouteConfig>): Route => {
  return {
    name: context.route.name,
    path: context.path,
    params: context.params
  }
}

const createDocumentHeader = async (props: HeadProps = {}) => {
  const siteConfig = await fetchData<SiteConfig>({ name: 'site' })

  if (!siteConfig) {
    return props
  }

  const { lang, name, description, social_image: { path } } = siteConfig

  const defaultHeader = {
    title: name,
    image: cockpitImage({ src: path }),
    description,
    lang,
    ...props
  }

  return {
    ...defaultHeader,
    title: truncate(stripTags(defaultHeader.title)),
    description: truncate(stripTags(defaultHeader.description))
  }
}

export const routes: Routes<{}, RouteConfig> = [
  {
    path: DEFAULT_ROUTE,
    name: '404',
    action: async context => {
      return {
        context: createRouteContext(context),
        view: await fetchView('NotFound'),
        head: await createDocumentHeader({ title: 'Page not found' }),
        beforeEnter,
        beforeLeave
      }
    }
  },
  {
    path: '/',
    name: 'home',
    action: async context => {
      const view = await fetchView('Home')
      const data = await new Promise<Record<string, string>>(r => setTimeout(() => r({ title: 'Home' }), 1000))
      const head = await createDocumentHeader({ title: data.title })

      return {
        context: createRouteContext(context),
        view,
        data,
        head,
        beforeEnter,
        beforeLeave
      }
    }
  },
  {
    path: '/parent',
    name: 'child',
    action: async () => ({ redirect: '/parent/child' })
  },
  {
    path: '/parent/:slug',
    name: 'child',
    action: async context => {
      return {
        context: createRouteContext(context),
        view: await fetchView('Child'),
        head: await createDocumentHeader({ title: 'Child' }),
        beforeEnter,
        beforeLeave
      }
    }
  }
]
