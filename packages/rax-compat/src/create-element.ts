import React, {
  Attributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect, useRef, forwardRef,
} from 'react';
// @ts-ignore
import { setupAppear } from 'appear-polyfill';
// @ts-ignore
import { convertUnit } from 'style-unit';
import { isFunction, isObject } from './type';

let appearSetup = false;
function setupAppearOnce() {
  if (!appearSetup) {
    setupAppear();
    appearSetup = true;
  }
}

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @returns Element
 */
export function createElement<P extends {
  ref: RefObject<any>;
  children: any;
  style?: object;
  onAppear?: Function;
  onDisappear?: Function;
}>(
  type: FunctionComponent<P>,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement {
  const { children: propsChildren, onAppear, onDisappear, ...rest } = props;
  // Compat for style unit.
  rest.style = compatStyle(rest.style);

  rest.ref = props.ref || useRef(null);
  let element: any = React.createElement(type, rest as Attributes & P | null, propsChildren, ...children);
  // Polyfill onAppear and onDisappear.
  if (isFunction(onAppear) || isFunction(onDisappear)) {
    setupAppearOnce();
    element = React.createElement(forwardRef(AppearOrDisappear), {
      onAppear: onAppear,
      onDisappear: onDisappear,
      ref: rest.ref,
    }, element);
  }

  return element;
}


const hasOwn = {}.hasOwnProperty;

function compatStyle(style?: object): any {
  if (isObject(style)) {
    const result = {};
    for (let key in style) {
      if (hasOwn.call(style, key)) {
        // @ts-ignore
        result[key] = convertUnit(style[key]);
      }
    }
    return result;
  }
}

// Appear HOC Component.
function AppearOrDisappear(props: any, ref: RefObject<EventTarget>) {
  const { onAppear, onDisappear } = props;

  listen('appear', onAppear);
  listen('disappear', onDisappear);

  function listen(eventName: string, handler: EventListenerOrEventListenerObject) {
    if (isFunction(handler) && ref != null) {
      useEffect(() => {
        const { current } = ref;
        if (current != null) {
          current.addEventListener(eventName, handler);
        }
        return () => {
          const { current } = ref;
          if (current) {
            current.removeEventListener(eventName, handler);
          }
        };
      }, [ref, handler]);
    }
  }

  return props.children;
}
