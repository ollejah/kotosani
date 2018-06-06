/**
 * Blazy
 * https://github.com/dinbror/blazy
 */

import Blazy from 'blazy'
const bLazy = new Blazy()

/** get current source */
const getCurrentSize = sel => {
  qsa(sel).forEach(img => {
    const res = new Promise((resolve, reject) => {
      img.onload = () => resolve(img.currentSrc)
      img.onerror = () => reject('Whoops!')
    })
    res.then(res => console.log(res))
  })
}
window.addEventListener('load', () => getCurrentSize('.b-lazy'), false)
window.addEventListener('resize', () => getCurrentSize('.b-lazy'), false)

