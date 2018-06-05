// Enable webpack HMR for extracted reelements
module.hot && module.hot.accept()

import '@/helpers/dom'

/**
 * Sticky polyfill
 * https://github.com/wilddeer/stickyfill
 */
import Stickyfill from 'stickyfilljs'
Stickyfill.add(qsa('.js-sticky'))

/**
 * Smooth Scroll polyfill
 * https://github.com/iamdustan/smoothscroll
 */
require('smoothscroll-polyfill').polyfill()

/**
 * Touch action
 */
// import { touchAction } from '@/vendors/touch-action'
// touchAction()

/**
 * Cache base elements
 */
const $html = qs('html')
// const $body = qs('body')
// const $header = qs('.js-header')
const $headerNavTrigger = qs('.js-header-nav-trigger')
const $headerNav = qs('.js-header-nav')

/**
 * Header nav trigger
 * открывает/закрывает меню
 *
 * Monitor Events
 * https://developers.google.com/web/tools/chrome-devtools/console/events
 * monitorEvents(document.body, "click")
 * unmonitorEvents(document.body)
 *
 * View event listeners registered on objects
 * getEventListeners(document)
 */
const headerNavState = e => {
  // e.preventDefault()
  if (window.matchMedia('(max-width: 767px)').matches) {
    // https://developer.mozilla.org/ru/docs/Web/API/Element/classList
    $html.classList.toggle('is-disabled')
    $html.classList.toggle('is-menu-open')
    $headerNavTrigger.classList.toggle('is-active')
    $headerNav.classList.toggle('is-open')
    // $headerNav.scrollTop = 0
  }
}
$headerNavTrigger.on('click', e => {
  e.preventDefault()
  headerNavState(e)
})
Array.from(qsa('.js-header-nav a')).forEach(el =>
  el.on('click', headerNavState)
)

/**
 * Lazy load images
 */
import Blazy from 'blazy'
const bLazy = new Blazy()

/**
 * Observe sections childs if visible into viewport
 */
const sections = Array.from(qsa('.l-section > *')).slice(1)
const showSections = () => {
  const io = new IntersectionObserver(
    changes =>
      changes.forEach(change => {
        const target = change.target
        // console.log(target, change.isIntersecting, change.intersectionRatio)
        if (change.isIntersecting) {
          target.classList.add('in-view')
          io.unobserve(target)
        }
      }),
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  )
  // const sections = Array.from(qsa('.l-section > *'))
  sections.forEach(item => io.observe(item))
}

// check inages loaded
// const imagesHolder = qsa('img[src]')
// console.log(imagesHolder)
// imagesHolder.forEach(img => {
//   const t = img.dataset.src.slice(8, -4)
//   console.time(t)
//   img.on('load', e => console.timeEnd(t), false)
// })

/**
 * Init, check document states
 */
console.time('readyStateComplete')
console.time('readyStateInteractive')
document.addEventListener('readystatechange', () => {
  console.log(document.readyState)
  if (document.readyState === 'interactive') {
    // showSections()
    console.timeEnd('readyStateInteractive')
  }
  if (document.readyState === 'complete') {
    // qs('html').classList.remove('is-loading')
    showSections()
    console.timeEnd('readyStateComplete')
  }
})

/**
 * Class ZoomImage
 */
import ZoomImage from '@/scripts/ZoomImage'
const imagesLoaded = qsa('[data-src]')
imagesLoaded.forEach(
  img =>
    new ZoomImage({
      trigger: img,
      endAnimate: 'visibility',
      // closeAfter: 500,
    })
)

/**
 * Open page form as Modal
 */
// import OpenFrame from '@/scripts/modal/OpenFrame'
// qsa('.js-menu a').forEach(
//   link =>
//     new OpenFrame({
//       opener: link,
//       closeAfter: 500,
//     })
// )

/**
 * Offline plugin (ServiceWorker, AppCache) for webpack
 * https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md
 */
import './scripts/service-worker'