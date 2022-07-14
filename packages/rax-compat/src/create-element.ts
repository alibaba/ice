import type {
  Attributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { createElement as _createElement, useEffect, useCallback, useRef } from 'react';
import { cached, convertUnit } from 'style-unit';
import { observerElement } from './visibility';
import { isFunction, isObject, isNumber } from './type';

// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js
// opacity -> opa
// fontWeight -> ntw
// lineHeight|lineClamp -> ne[ch]
// flex|flexGrow|flexPositive|flexShrink|flexNegative|boxFlex|boxFlexGroup|zIndex -> ex(?:s|g|n|p|$)
// order -> ^ord
// zoom -> zoo
// gridArea|gridRow|gridRowEnd|gridRowSpan|gridRowStart|gridColumn|gridColumnEnd|gridColumnSpan|gridColumnStart -> grid
// columnCount -> mnc
// tabSize -> bs
// orphans -> orp
// windows -> ows
// animationIterationCount -> onit
// borderImageOutset|borderImageSlice|borderImageWidth -> erim
const NON_DIMENSIONAL_REG = /opa|ntw|ne[ch]|ex(?:s|g|n|p|$)|^ord|zoo|grid|orp|ows|mnc|^columns$|bs|erim|onit/i;

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
  type: FunctionComponent<P> | string,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement {
  // Get a shallow copy of props, to avoid mutating the original object.
  const rest = Object.assign({}, props);
  const { onAppear, onDisappear } = rest;

  // Delete props that are not allowed in react.
  delete rest.onAppear;
  delete rest.onDisappear;

  // Compat for style unit.
  const compatStyleProps = compatStyle(rest.style);
  if (compatStyleProps) {
    rest.style = compatStyleProps;
  }

  // Compat for visibility events.
  if (isFunction(onAppear) || isFunction(onDisappear)) {
    return _createElement(
      VisibilityChange,
      {
        onAppear,
        onDisappear,
        // Passing child ref to `VisibilityChange` to avoid creating a new ref.
        childRef: rest.ref,
        // Using forwardedRef as a prop to the backend react element.
        forwardRef: (ref: RefObject<any>) => _createElement(type, Object.assign({ ref }, rest), ...children),
      },
    );
  } else {
    return _createElement(type, rest, ...children);
  }
}

function VisibilityChange({
  onAppear,
  onDisappear,
  childRef,
  forwardRef,
}: any) {
  const fallbackRef = useRef(null); // `fallbackRef` used if `childRef` is not provided.
  const ref = childRef || fallbackRef;

  const listen = useCallback((eventName: string, handler: Function) => {
    const { current } = ref;
    if (current != null) {
      if (isFunction(handler)) {
        observerElement(current as HTMLElement);
        current.addEventListener(eventName, handler);
      }
    }
    return () => {
      const { current } = ref;
      if (current) {
        current.removeEventListener(eventName, handler);
      }
    };
  }, [ref]);

  useEffect(() => listen('appear', onAppear), [ref, onAppear, listen]);
  useEffect(() => listen('disappear', onDisappear), [ref, onDisappear, listen]);

  return forwardRef(ref);
}

const isDimensionalProp = cached((prop: string) => !NON_DIMENSIONAL_REG.test(prop));

// Convert unit as driver-dom does.
// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js#L346
function compatStyle<S = object>(style?: S): S | void {
  if (isObject(style)) {
    // Do not modify the original style object, copy results to another plain object.
    const result = Object.create(Object.prototype);
    for (let key in style) {
      const value = style[key];
      if (isNumber(value) && isDimensionalProp(key)) {
        // Transform rpx to vw.
        result[key] = convertUnit(`${value}rpx`);
      } else {
        result[key] = convertUnit(value);
      }
    }
    return result;
  }
  return style;
}
