export function isTouch() {
  return ('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0);
}
