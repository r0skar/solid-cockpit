import CSSPlugin from 'gsap/CSSPlugin'
import AttrPlugin from 'gsap/AttrPlugin'
import { Animation } from 'gsap/all'
import { createAbortablePromise } from 'App/lib/utils'

const _activatedPlugins = [ CSSPlugin, AttrPlugin ]

export const createAnimation = (animation: Animation) => {
  animation.paused(true)

  return {
    ...animation,
    play: () => createAbortablePromise(() => new Promise<Animation>(onComplete => {
      animation.eventCallback('onComplete', onComplete)
      return animation.play(0)
    }), 'Animation canceled')
  }
}
