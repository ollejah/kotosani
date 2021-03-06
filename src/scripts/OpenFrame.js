'use strict'

import '@/helpers/dom'
// import transitionEnd from '@/helpers/transition'
// import animationEnd from '@/helpers/animation'

import docOffset from '@/helpers/document-offset'

/**
 * Class Open iFrame as Modal
 */
export default class OpenFrame {
  constructor({ opener, closeAfter }) {
    this.root = qs('html')
    this.modal = qs('.js-overlay')
    this.opener = opener
    this.closer = qs('.js-close')
    this.spinner = qs('.js-spinner')
    this.show = false
    this.closeAfter = closeAfter
    this.init()
  }

  init() {
    // Array.from(qsa(this.opener)).forEach(target =>
    this.opener.on(
      'click',
      e => {
        e.preventDefault()
        this.show = true
        console.log(e)
        this.open()
      },
      false
    )
    // )
    document.addEventListener(
      'keydown',
      e => {
        if (this.show && e.keyCode == 27) this.close()
      },
      false
    )
  }

  open() {
    // Store document scroll position
    this.docOffset = docOffset.get()
    toggleViewportScrolling(false)

    this.root.classList.add('is-disabled')
    this.modal.removeAttribute('hidden')
    this.modal.classList.add('is-active')
    this.iframe = this.load()
    window.postMessage('opened...', '*')

    // Закрывает при клике на оверлей
    // this.modal.on('click', e => this.close(), false)

    // Закрывает при клике на кнопку закрытия
    this.closer.on('click', e => {
      e.preventDefault()
      this.close()
    })
  }

  load() {
    this.spinner.classList.add('is-active')
    const iframe = qs(this.opener.hash)
    iframe.setAttribute('src', this.opener.dataset.src)
    iframe.on('load', e => {
      iframe.classList.add('is-active')
      this.spinner.classList.remove('is-active')
      window.postMessage('loaded...', '*')
    })
    return iframe
  }

  close() {
    this.show = false
    this.modal.classList.remove('is-active')
    docOffset.set(this.docOffset)
    toggleViewportScrolling(true)
    setTimeout(() => {
      this.iframe.classList.remove('is-active')
      this.root.classList.remove('is-disabled')
      window.postMessage('closed...', '*')
    }, this.closeAfter)

    /*
    this.modal.on(transitionEnd, e => {
      if (e.propertyName == this.closeAfter) {
        console.log(e.propertyName)
        this.iframe.classList.remove('is-active')
        this.iframe.setAttribute('hidden', '')
      }
    })
    */
  }
}