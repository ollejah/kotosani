'use strict'

import '@/helpers/dom'
import transitionEnd from '@/helpers/transition'
import animationEnd from '@/helpers/animation'

// Getter, Setter document position Y
const getOffsetTop = () =>
  window.pageYOffset || document.documentElement.scrollTop

const setDocOffset = posy =>
  (document.documentElement.scrollTop = document.body.scrollTop = posy)

/**
 * Class ZoomImage
 */
export default class ZoomImage {
  constructor({ trigger, endAnimate }) {
    this.root = qs('html')
    // this.modal = qs('.js-overlay')
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
    this.getDocOffset = getOffsetTop()

    this.zoom = document.createElement('div')
    this.zoom.innerHTML = this.template(target)
    this.zoom.style.top = `${this.getDocOffset}px`
    document.body.appendChild(this.zoom)
    this.zoom.classList.add('c-overlay', 'c-zoomable')
    setTimeout(() => this.zoom.classList.add('is-active'), 10)
    this.root.classList.add('is-disabled')

    // Закрывает при клике на оверлей
    this.zoom.on('click', e => this.close(e), false)

    // Закрывает при клике на кнопку х
    this.closer.on('click', e => this.close(e), false)
  }

  close(e) {
    e.preventDefault()
    this.show = false
    this.zoom.classList.remove('is-active')
    this.zoom.on(transitionEnd, e => {
      if (e.propertyName == this.endAnimate) {
        document.body.removeChild(this.zoom)
      }
    })
    this.root.classList.remove('is-disabled')
  }
}