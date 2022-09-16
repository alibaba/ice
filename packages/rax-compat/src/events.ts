
// Fork from https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMEventProperties.js#L36
const events = [
  'abort',
  'auxClick',
  'animationEnd',
  'animationIteration',
  'animationStart',
  'cancel',
  'canPlay',
  'canPlayThrough',
  'click',
  'close',
  'contextMenu',
  'copy',
  'cut',
  'dblclick',
  'drag',
  'dragEnd',
  'dragEnter',
  'dragExit',
  'dragLeave',
  'dragOver',
  'dragStart',
  'drop',
  'durationChange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'gotPointerCapture',
  'input',
  'invalid',
  'keyDown',
  'keyPress',
  'keyUp',
  'load',
  'loadedData',
  'loadedMetadata',
  'loadStart',
  'lostPointerCapture',
  'mouseDown',
  'mouseMove',
  'mouseOut',
  'mouseOver',
  'mouseUp',
  'paste',
  'pause',
  'play',
  'playing',
  'pointerCancel',
  'pointerDown',
  'pointerMove',
  'pointerOut',
  'pointerOver',
  'pointerUp',
  'progress',
  'rateChange',
  'reset',
  'resize',
  'seeked',
  'seeking',
  'stalled',
  'submit',
  'suspend',
  'transitionEnd',
  'timeUpdate',
  'touchCancel',
  'touchEnd',
  'touchStart',
  'volumeChange',
  'scroll',
  'toggle',
  'touchMove',
  'waiting',
  'wheel',
  // EnterLeaveEventPlugin.registerEvents need't to convert to other bubbling events in rax compat,
  // which are directly brokered, leaving the rest to React.
  // https://github.com/facebook/react/blob/main/packages/react-dom/src/events/plugins/EnterLeaveEventPlugin.js#L29
  'mouseEnter',
  'mouseLeave',
  'pointerEnter',
  'pointerLeave',
  // https://github.com/facebook/react/blob/main/packages/react-dom/src/events/plugins/ChangeEventPlugin.js#L37
  'change',
  // https://github.com/facebook/react/blob/main/packages/react-dom/src/events/plugins/SelectEventPlugin.js
  'select',
  // https://github.com/facebook/react/blob/main/packages/react-dom/src/events/plugins/BeforeInputEventPlugin.js
  'beforeInput',
  'compositionEnd',
  'compositionStart',
  'compositionUpdate',
];

// A map for transform event to react event.
// Such as ontouchstart transform to onTouchStart.
export const registrationNameToReactEvent: Map<string, string> = new Map();

registerEvents();

function registerDirectEvent(
  registrationName: string,
  reactEventName: string,
) {
  registrationNameToReactEvent.set(`on${registrationName}`, reactEventName);
}

function registerEvents() {
  for (let i = 0; i < events.length; i++) {
    const eventName: string = events[i];
    const domEventName: string = eventName.toLowerCase();
    const capitalizedEvent = eventName[0].toUpperCase() + eventName.slice(1);
    registerDirectEvent(domEventName, `on${capitalizedEvent}`);
  }
  // Special cases where event names don't match.
  registerDirectEvent('dblclick', 'onDoubleClick');
}

