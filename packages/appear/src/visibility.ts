// Handle appear and disappear event.
// Fork from https://github.com/raxjs/appear-polyfill
// @ts-nocheck
import PolyfilledIntersectionObserver from './intersection-observer';

export enum VisibilityChangeEvent {
  appear = 'appear',
  disappear = 'disappear',
}

enum VisibilityChangeDirection {
  up = 'up',
  down = 'down',
}

// Shared intersectionObserver instance.
let intersectionObserver: any;
const IntersectionObserver = (function () {
  if (typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // features are natively supported
    return window.IntersectionObserver;
  } else {
    // polyfilled IntersectionObserver
    return PolyfilledIntersectionObserver;
  }
})();

function generateThreshold(number: number) {
  const thresholds = [];
  for (let index = 0; index < number; index++) {
    thresholds.push(index / number);
  }

  return thresholds;
}

const defaultOptions = {
  // @ts-ignore
  root: null,
  rootMargin: '0px',
  threshold: generateThreshold(10),
};

export function createIntersectionObserver(options = defaultOptions) {
  intersectionObserver = new IntersectionObserver(handleIntersect, options);
}

export function destroyIntersectionObserver() {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
}

export function observerElement(element: HTMLElement | Node) {
  if (!intersectionObserver) createIntersectionObserver();

  if (element === document) element = document.documentElement;

  intersectionObserver.observe(element);
}

function handleIntersect(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    const {
      target,
      boundingClientRect,
      intersectionRatio,
    } = entry;
    // No `top` value in polyfill.
    const currentY = boundingClientRect.y || boundingClientRect.top;
    const beforeY = parseInt(target.getAttribute('data-before-current-y'), 10) || currentY;

    // is in view
    if (
      intersectionRatio > 0.01 &&
      !isTrue(target.getAttribute('data-appeared')) &&
      !appearOnce(target as HTMLElement, VisibilityChangeEvent.appear)
    ) {
      target.setAttribute('data-appeared', 'true');
      target.setAttribute('data-has-appeared', 'true');
      target.dispatchEvent(createEvent(VisibilityChangeEvent.appear, {
        direction: currentY > beforeY ? VisibilityChangeDirection.up : VisibilityChangeDirection.down,
      }));
    } else if (
      intersectionRatio === 0 &&
      isTrue(target.getAttribute('data-appeared')) &&
      !appearOnce(target as HTMLElement, VisibilityChangeEvent.disappear)
    ) {
      target.setAttribute('data-appeared', 'false');
      target.setAttribute('data-has-disappeared', 'true');
      target.dispatchEvent(createEvent(VisibilityChangeEvent.disappear, {
        direction: currentY > beforeY ? VisibilityChangeDirection.up : VisibilityChangeDirection.down,
      }));
    }

    target.setAttribute('data-before-current-y', String(currentY));
  });
}

/**
 * need appear again when node has isonce or data-once
 */
function appearOnce(node: HTMLElement, type: VisibilityChangeEvent) {
  const isOnce = isTrue(node.getAttribute('isonce')) || isTrue(node.getAttribute('data-once'));
  const appearType = type === VisibilityChangeEvent.appear ? 'data-has-appeared' : 'data-has-disappeared';

  return isOnce && isTrue(node.getAttribute(appearType));
}

function isTrue(flag: any) {
  return flag && flag !== 'false';
}

function createEvent(eventName: string, data: any) {
  return new CustomEvent(eventName, {
    bubbles: false,
    cancelable: true,
    detail: data,
  });
}
