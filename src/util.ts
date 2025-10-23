// attach event listener to element
const subscribeEventListener = function (
  el: HTMLElement | null,
  event: keyof HTMLElementEventMap,
  callback: () => void,
): (() => void) | undefined {
  if (!el || !event || !callback) {
    return;
  }

  el.addEventListener(event, callback);

  return function () {
    el.removeEventListener(event, callback);
  };
};

export { subscribeEventListener };
