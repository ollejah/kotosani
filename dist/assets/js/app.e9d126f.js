(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"./app.js":function(e,n,t){"use strict";t.r(n),function(e){t("./helpers/dom.js");var n=t("../node_modules/stickyfilljs/dist/stickyfill.js"),i=t.n(n),o=t("../node_modules/blazy/blazy.js"),s=t.n(o),a=t("./scripts/ZoomImage.js");t("./scripts/service-worker.js");e.hot&&e.hot.accept(),i.a.add(qsa(".js-sticky")),t("../node_modules/smoothscroll-polyfill/dist/smoothscroll.js").polyfill();var r=qs("html"),c=qs(".js-header-nav-trigger"),l=qs(".js-header-nav"),d=function(e){window.matchMedia("(max-width: 767px)").matches&&(r.classList.toggle("is-disabled"),r.classList.toggle("is-menu-open"),c.classList.toggle("is-active"),l.classList.toggle("is-open"))};c.on("click",function(e){e.preventDefault(),d()}),Array.from(qsa(".js-header-nav a")).forEach(function(e){return e.on("click",d)});new s.a;var u=Array.from(qsa(".l-section > *")).slice(1);document.addEventListener("readystatechange",function(){var e;document.readyState,"complete"===document.readyState&&(e=new IntersectionObserver(function(n){return n.forEach(function(n){var t=n.target;n.isIntersecting&&(t.classList.add("in-view"),e.unobserve(t))})},{rootMargin:"50px 0px",threshold:.01}),u.forEach(function(n){return e.observe(n)}))}),qsa("[data-src]").forEach(function(e){return new a.a({trigger:e,endAnimate:"visibility"})})}.call(this,t("../node_modules/webpack/buildin/harmony-module.js")(e))},"./helpers/dom.js":function(e,n){window.qs=document.querySelector.bind(document),window.qsa=document.querySelectorAll.bind(document),Element.prototype.on=Element.prototype.addEventListener,Element.prototype.off=Element.prototype.removeEventListener},"./scripts/ZoomImage.js":function(e,n,t){"use strict";t("./helpers/dom.js");var i=function(){var e=document.createElement("fakeelement"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var t in n)if(void 0!==e.style[t])return n[t]}();!function(){var e=document.createElement("fakeelement"),n={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(var t in n)if(void 0!==e.style[t])return n[t]}();var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();var s=function(e){return e.preventDefault()},a=function(){document.documentElement.classList.add("is-disabled"),document.documentElement.addEventListener("touchmove",s)},r=function(){document.documentElement.classList.remove("is-disabled"),document.documentElement.removeEventListener("touchmove",s)},c=function(){function e(n){var t=n.trigger,i=n.endAnimate;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.root=qs("html"),this.trigger=t,this.closer=qs(".js-close"),this.show=!1,this.endAnimate=i,this.init()}return o(e,[{key:"init",value:function(){var e=this;this.trigger.on("click",function(n){n.preventDefault(),e.show=!0,e.open(n.target)},!1),document.addEventListener("keydown",function(n){e.show&&27==n.keyCode&&e.close(n)},!1)}},{key:"template",value:function(e){var n=e.src,t=e.alt,i=void 0===t?null:t;return'\n      <figure>\n        <img src="'+n+'">\n        '+(i?"<figcaption>"+i+"</figcaption>":"")+'\n      </figure>\n      <button class="c-close js-close">&times;</button>\n    '}},{key:"open",value:function(e){var n=this;a(),this.modal=document.createElement("div"),this.modal.innerHTML=this.template(e),document.body.appendChild(this.modal),this.modal.classList.add("c-overlay-image"),setTimeout(function(){return n.modal.classList.add("is-active")},10),this.modal.on("click",function(e){return n.close(e)},!1),this.closer.on("click",function(e){return n.close(e)},!1)}},{key:"close",value:function(e){var n=this;e.preventDefault(),this.show=!1,r(),this.modal.classList.remove("is-active"),this.modal.on(i,function(e){e.propertyName==n.endAnimate&&document.body.removeChild(n.modal)})}}]),e}();n.a=c},"./scripts/service-worker.js":function(e,n,t){"use strict";var i=t("../node_modules/offline-plugin/runtime.js");i.install({onUpdating:function(){},onUpdateReady:function(){i.applyUpdate()},onUpdated:function(){window.location.reload()},onUpdateFailed:function(){}}),window.addEventListener("offline",function(){return s()}),window.addEventListener("online",function(){return s()}),!navigator.onLine&&setTimeout(function(){return s()},300);var o=document.querySelector(".js-offline-ready");function s(){navigator.onLine,navigator.onLine?o.classList.remove("is-active"):o.classList.add("is-active")}o.addEventListener("click",function(e){return o.classList.remove("is-active")})},"./styles/app.scss":function(e,n,t){},1:function(e,n,t){t("./styles/app.scss"),e.exports=t("./app.js")}},[[1,0,1]]]);
//# sourceMappingURL=app.e9d126f.js.map