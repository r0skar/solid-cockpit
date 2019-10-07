import * as _ from 'solid-js'

declare module 'solid-js' {
  type ComponentChildren = Component | boolean | string | unknown | undefined
  type ComponentProps<T = Record<string, unknown>> = T & { children?: JSX.Children }
  export type Component<T = Record<string, unknown>> = (props: ComponentProps<T>) => ComponentChildren
  export type View<T = Record<string, unknown>> = Component<{ data?: T }>
}

// https://github.com/ryansolid/solid/blob/master/documentation/rendering.md#control-flow
declare global {
  function Portal(props: {
    anchor: HTMLElement
    children?: JSX.Children
  }): unknown

  function Switch(props: {
    fallback?: HTMLElement
    children?: JSX.Children
  }): unknown

  function Suspense(props: {
    fallback?: HTMLElement
    children?: JSX.Children
  }): unknown

  function Show(props: {
    when: boolean
    fallback?: HTMLElement
    children?: JSX.Children
  }): unknown

  function Match(props: {
    when: boolean
    children?: JSX.Children
  }): unknown

  function For<T = unknown>(props: {
    each: T[]
    fallback?: HTMLElement
    children?: (item: T) => JSX.Children
  }): unknown
}
