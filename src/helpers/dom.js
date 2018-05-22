/**
 * Dom Helpers
 */

window.qs = document.querySelector.bind(document);
window.qsa = document.querySelectorAll.bind(document);
Element.prototype.on = Element.prototype.addEventListener;
Element.prototype.off = Element.prototype.removeEventListener;
