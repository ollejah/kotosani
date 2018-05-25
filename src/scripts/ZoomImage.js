'use strict'

import '@/helpers/dom'
import transitionEnd from '@/helpers/transition'
import animationEnd from '@/helpers/animation'

/**
 * Preventing body scroll for modals in iOS
 * https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 */
const prevent = e => e.preventDefault()
const viewportScrolling = {
  stop: () => {
    document.documentElement.classList.add('is-disabled')
    document.documentElement.addEventListener('touchmove', prevent)
  },
  start: () => {
    document.documentElement.classList.remove('is-disabled')
    document.documentElement.removeEventListener('touchmove', prevent)
  },
}

/** Getter, Setter document position Y */
// const docOffset = {
//   get: () => {
//     return window.pageYOffset || document.documentElement.scrollTop
//   },
//   set: posy => {
//     return (document.documentElement.scrollTop = document.body.scrollTop = posy)
//   },
// }

/**
 * Class ZoomImage
 */
export default class ZoomImage {
  constructor({ trigger, endAnimate }) {
    this.root = qs('html')
    this.trigger = trigger
    this.closer = qs('.js-close')
    this.show = false
    this.endAnimate = endAnimate
    this.init() // init zoom fn
  }

  init() {
    this.trigger.on(
      'click',
      e => {
        e.preventDefault()
        this.show = true
        this.open(e.target)
      },
      false
    )
    /** Bind close to pressed Escape key */
    document.addEventListener(
      'keydown',
      e => {
        if (this.show && e.keyCode == 27) this.close(e)
      },
      false
    )
  }

  template({ src, alt = null }) {
    return `
      <figure>
        <img src="${src}">
        ${alt ? '<figcaption>' + alt + '</figcaption>' : ''}
      </figure>
      <button class="c-close js-close">&times;</button>
    `
  }

  open(target) {
    // Store document scroll position
    // this.docOffset = docOffset.get()
    viewportScrolling.stop()

    this.modal = document.createElement('div')
    this.modal.innerHTML = this.template(target)
    document.body.appendChild(this.modal)
    this.modal.classList.add('c-overlay-image')
    setTimeout(() => this.modal.classList.add('is-active'), 10)

    // Закрывает при клике на оверлей
    this.modal.on('click', e => this.close(e), false)

    // Закрывает при клике на кнопку ✕
    this.closer.on('click', e => this.close(e), false)
  }

  close(e) {
    e.preventDefault()
    this.show = false
    viewportScrolling.start()
    this.modal.classList.remove('is-active')
    this.modal.on(transitionEnd, e => {
      if (e.propertyName == this.endAnimate) {
        document.body.removeChild(this.modal)
      }
    })
  }
}