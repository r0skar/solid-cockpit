import { createState, createContext, useContext } from 'solid-js'

export interface Route {
  name?: string
  path: string
  params: Record<string, unknown>
}

export interface Routing {
  route?: Route
  prevRoute?: Route
}

interface State {
  routing: Routing
}

interface Actions {
  SET_ROUTE: (route: Route) => void
}

const [ state, dispatch ] = createState<State>({
  routing: {}
})

const actions: Actions = {
  SET_ROUTE: route => {
    dispatch('routing', (r: Routing) => ({
      route,
      prevRoute: r.route
    }))
  }
}

const store = createContext([ state, actions ])

export const Store = store.Provider

export const useStore = (): [ State, Actions ] => useContext(store)
