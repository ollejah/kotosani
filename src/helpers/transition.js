/**
 * Transition.end
 * From Modernizr
 */

function whichTransitionEvent() {
  let el = document.createElement("fakeelement");
  let transitions = {
    transition: "transitionend", // IE10, Opera, Chrome, FF 15+, Saf 7+
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend", // only for FF < 15
    WebkitTransition: "webkitTransitionEnd" // Saf 6, Android Browser
  };
  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

// export const transitionEnd = whichTransitionEvent()
export default whichTransitionEvent();
