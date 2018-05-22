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

/*
// var hexagon = document.querySelector('#hexagon')
var offlineReady = document.querySelector('#offline-ready')
// var offlineReadyClose = document.querySelector('#offline-ready-close')
// var wifiShape = document.querySelector('#wifi-shape')

;(function() {
  var rotation = 0

  setInterval(function() {
    if (rotation === 300) {
      rotation = -60
      // hexagon.removeAttribute('data-animation')
      // hexagon.style.transform = 'rotate(' + rotation + 'deg)'
    }

    rotation = rotation + 60

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        // hexagon.setAttribute('data-animation', '')
        // hexagon.style.transform = 'rotate(' + rotation + 'deg)'
      })
    })
  }, 3000)
})()

// offlineReadyClose.addEventListener('click', function() {
//   closeOfflineReady()
// })

window.addEventListener('offline', function() {
  goOffline()
})

window.addEventListener('online', function() {
  console.log('wifi-offline')
  // requestAnimationFrame(function() {
  //   wifiShape.classList.remove('wifi-offline')
  //   requestAnimationFrame(function() {
  //     wifiShape.classList.add('wifi-online')
  //   })
  // })
})

if (!navigator.onLine) {
  setTimeout(function() {
    goOffline()
  }, 300)
}

function goOffline() {
  console.log('wifi-online')
  // requestAnimationFrame(function() {
  //   wifiShape.classList.remove('wifi-online')
  //   requestAnimationFrame(function() {
  //     wifiShape.classList.add('wifi-offline')
  //   })
  // })
}

function openOfflineReady() {
  // requestAnimationFrame(function() {
  //   offlineReady.setAttribute('data-open', '')
  // })
  // setTimeout(closeOfflineReady, 30 * 1000)
}

function closeOfflineReady() {
  requestAnimationFrame(function() {
    offlineReady.removeAttribute('data-open')
  })
}*/