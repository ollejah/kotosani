/**
 * Offline plugin (ServiceWorker, AppCache) for webpack
 * https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md
 * require('offline-plugin/runtime').install();
 */

import * as runtime from 'offline-plugin/runtime'
// runtime.install()

runtime.install({
  onUpdating: () => {
    console.info('SW runtime Event:', 'onUpdating')
  },
  onUpdateReady: () => {
    console.info('SW runtime Event:', 'onUpdateReady')
    // Tells to new SW to take control immediately
    runtime.applyUpdate()
  },
  onUpdated: () => {
    console.info('SW runtime Event:', 'onUpdated')
    // Reload the webpage to load into the new version
    window.location.reload()
  },
  onUpdateFailed: () => {
    console.warn('SW runtime Event:', 'onUpdateFailed')
  },
})

// setTimeout(() => runtime.applyUpdate(), 5000)

/**
 * Offline state
 */

/** offlineReady banner */
const offlineReady = document.querySelector('.js-offline-ready')

function goOffline() {
  if (!navigator.onLine) {
    offlineReady.classList.add('is-active')
    setTimeout(() => offlineReady.classList.remove('is-active'), 10000)
  } else {
    offlineReady.classList.remove('is-active')
  }
  console.log(navigator.onLine)
}

window.addEventListener('offline', goOffline)
window.addEventListener('online', goOffline)

// Check if device online
!navigator.onLine && setTimeout(() => goOffline(), 300)

offlineReady.addEventListener('click', e =>
  offlineReady.classList.remove('is-active')
)