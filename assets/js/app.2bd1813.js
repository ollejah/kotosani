(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"./app.js":function(e,t,n){"use strict";n.r(t),function(e){n("./helpers/dom.js");var t=n("../node_modules/stickyfilljs/dist/stickyfill.js"),o=n.n(t),i=n("../node_modules/blazy/blazy.js"),s=n.n(i),a=n("./scripts/ZoomImage.js");n("./scripts/service-worker.js");e.hot&&e.hot.accept(),o.a.add(qsa(".js-sticky")),n("../node_modules/smoothscroll-polyfill/dist/smoothscroll.js").polyfill();var r=qs("html"),c=qs(".js-header-nav-trigger"),l=qs(".js-header-nav"),d=function(e){window.matchMedia("(max-width: 767px)").matches&&(r.classList.toggle("is-disabled"),r.classList.toggle("is-menu-open"),c.classList.toggle("is-active"),l.classList.toggle("is-open"))};c.on("click",function(e){e.preventDefault(),d()}),Array.from(qsa(".js-header-nav a")).forEach(function(e){return e.on("click",d)});new s.a;var u=Array.from(qsa(".l-section > *")).slice(1);document.addEventListener("readystatechange",function(){var e;document.readyState,"complete"===document.readyState&&(qs("html").classList.remove("is-loading"),qs(".js-offline-ready").removeAttribute("hidden"),e=new IntersectionObserver(function(t){return t.forEach(function(t){var n=t.target;t.isIntersecting&&(n.classList.add("in-view"),e.unobserve(n))})},{rootMargin:"50px 0px",threshold:.01}),u.forEach(function(t){return e.observe(t)}))}),qsa("[data-src]").forEach(function(e){return new a.a({trigger:e,endAnimate:"visibility"})})}.call(this,n("../node_modules/webpack/buildin/harmony-module.js")(e))},"./helpers/dom.js":function(e,t){window.qs=document.querySelector.bind(document),window.qsa=document.querySelectorAll.bind(document),Element.prototype.on=Element.prototype.addEventListener,Element.prototype.off=Element.prototype.removeEventListener},"./scripts/ZoomImage.js":function(e,t,n){"use strict";n("./helpers/dom.js");var o=function(){var e=document.createElement("fakeelement"),t={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var n in t)if(void 0!==e.style[n])return t[n]}(),i=function(e){return e.preventDefault()},s=function(){document.documentElement.classList.add("is-disabled"),document.documentElement.addEventListener("touchmove",i)},a=function(){document.documentElement.classList.remove("is-disabled"),document.documentElement.removeEventListener("touchmove",i)},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var c=function(){function e(t){var n=t.trigger,o=t.endAnimate;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.root=qs("html"),this.trigger=n,this.show=!1,this.endAnimate=o,this.init()}return r(e,[{key:"init",value:function(){var e=this;this.trigger.on("click",function(t){t.preventDefault(),e.show=!0,e.open(t.target)},!1),document.addEventListener("keydown",function(t){e.show&&27==t.keyCode&&e.close(t)},!1)}},{key:"template",value:function(e){var t=e.src,n=e.alt,o=void 0===n?null:n;return'\n      <figure>\n        <img src="'+t+'">\n        '+(o?"<figcaption>"+o+"</figcaption>":"")+'\n      </figure>\n      <button class="c-close js-close">&times;</button>\n    '}},{key:"open",value:function(e){var t=this;s(),this.modal=document.createElement("div"),this.modal.innerHTML=this.template(e),document.body.appendChild(this.modal),this.modal.classList.add("c-overlay-image"),setTimeout(function(){return t.modal.classList.add("is-active")},10),this.modal.on("click",function(e){return t.close(e)},!1),qs(".js-close").on("click",function(e){return t.close(e)},!1)}},{key:"close",value:function(e){var t=this;e.preventDefault(),this.show=!1,a(),this.modal.classList.remove("is-active"),this.modal.on(o,function(e){e.propertyName==t.endAnimate&&document.body.removeChild(t.modal)})}}]),e}();t.a=c},"./scripts/service-worker.js":function(e,t,n){"use strict";var o=n("../node_modules/offline-plugin/runtime.js");o.install({onUpdating:function(){},onUpdateReady:function(){o.applyUpdate()},onUpdated:function(){window.location.reload()},onUpdateFailed:function(){}});var i=document.querySelector(".js-offline-ready");function s(){navigator.onLine?i.classList.remove("is-active"):i.classList.add("is-active")}window.addEventListener("offline",s),window.addEventListener("online",s),!navigator.onLine&&setTimeout(function(){return s()},300),i.addEventListener("click",function(e){return i.classList.remove("is-active")})},"./styles/app.scss":function(e,t,n){},1:function(e,t,n){n("./styles/app.scss"),e.exports=n("./app.js")}},[[1,0,1]]]);
//# sourceMappingURL=app.2bd1813.js.map