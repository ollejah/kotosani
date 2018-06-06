/**
 * Render srcset images
 * ${ require('./inc/responsive').image(require('@/images/i003.jpg?sizes[]')) }
 * ${ require('./inc/responsive').picture(require('@/images/i003.jpg?sizes[]')) }
 */

/**
 * Create responsive images <picture>
 * art direction, @supports picture, srcset
 */
export function picture(items, alt = '') {
  // Set sources for <source> tag
  const tmpl = item => `<source 
    data-srcset="${item.path}" 
    media="(max-width: ${item.width}px)"
  >`
  // const images = items.images.reverse()
  let result = items.images.reduce(
    (total, current) => (total += tmpl(current)),
    ''
  )
  // Set sources for <img> tag
  const imgSrc = items.images.pop().path
  result += `<img class="b-lazy" alt="" 
    src="${items.placeholder}" 
    data-src="${imgSrc}"
  >`
  return `<picture>${result}</picture>`
}

/**
 * Create responsive images into <img>
 * @supports srcset
 */
export function image(items, alt = '') {
  // Set sources for <img> tag
  const imgSrc = items.images.pop().path
  const result = `
    <img class="b-lazy" sizes="100w" alt="${alt}" 
    src="${items.placeholder}" 
    data-src="${imgSrc}" 
    data-srcset="${items.srcSet}">`

  return `<figure>${result}</figure>`
}