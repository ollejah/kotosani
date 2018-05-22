/**
 * Animation end
 * From Modernizr
 */

function whichAnimationEvent() {
  let t,
    el = document.createElement("fakeelement");
  let animations = {
    animation: "animationend", // IE10, Opera, Chrome, FF 15+, Saf 7+
    OAnimation: "oAnimationEnd",
    MozAnimation: "animationend", // only for FF < 15
    WebkitAnimation: "webkitAnimationEnd" // Saf 6, Android Browser
  };
  for (let t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

export default whichAnimationEvent();
