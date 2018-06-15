/** 
 * Preventing body scroll for modals in iOS
 * https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 */

const prevent = e => e.preventDefault()

// import as viewportScrolling
export default {
  stop: () => {
    document.documentElement.classList.add('is-disabled')
    document.documentElement.addEventListener('touchmove', prevent)
  },
  start: () => {
    document.documentElement.classList.remove('is-disabled')
    document.documentElement.removeEventListener('touchmove', prevent)
  },
}