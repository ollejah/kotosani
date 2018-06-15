'use strict'

import '@/helpers/dom'
import transitionEnd from '@/helpers/transition'
// import animationEnd from '@/helpers/animation'

/**  Preventing body scroll for modals in iOS */
import viewportScrolling from '@/helpers/viewport-scrolling'
// import docOffset from '@/helpers/document-offset'

/**
 * Class ZoomImage
 */
export default class ZoomImage {
  constructor({ trigger, endAnimate }) {
    this.root = qs('html')
    this.trigger = trigger
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
    qs('.js-close').on('click', e => this.close(e), false)
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