/**
 * Helper : Document offset
 * Getter, Setter document position Y
 */

/*
export function getDocHeight(doc) {
  doc = doc || document
  // stackoverflow.com/questions/1145850/
  const body = doc.body,
    html = doc.documentElement
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  return height
}*/

// docOffset
export default {
  get: () => {
    return window.pageYOffset || document.documentElement.scrollTop
  },
  set: posy => {
    return (document.documentElement.scrollTop = document.body.scrollTop = posy)
  },
}