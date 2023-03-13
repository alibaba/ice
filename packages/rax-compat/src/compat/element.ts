import type { ReactElement } from 'react';
import { createElement } from 'react';
import VisibilityChange from '@ice/appear';
import transformProps from '../props';
import { compatStyle } from '../style';
import { isFunction } from '../type';
import { InputCompat } from './input';

let ElementFactory: (type: any, props: any, ...args: any[]) => ReactElement;
export function createJSXElementFactory(factory: typeof ElementFactory) {
  return (type: any, props: object, ...args: any[]): ReactElement => {
    // Get a shallow copy of props, to avoid mutating the original object.
    let rest = Object.assign({}, props) as any;
    const { onAppear, onDisappear } = rest;

    // Delete props that are not allowed in react.
    delete rest.onAppear;
    delete rest.onDisappear;

    // Compat for props.
    // Only the dom needs to be transformed, not the components.
    if (typeof type === 'string') {
      rest = transformProps(rest);
    }

    // Compat for style unit.
    if (rest.style) {
      rest.style = compatStyle(rest.style);
    }

    // Setting the value of props makes the component be a controlled component in React.
    // But setting the value is same as web in Rax.
    // User can modify value of props to modify native input value
    // and native input can also modify the value of self in Rax.
    // So we should compat input to InputCompat, the same as textarea.
    if (type === 'input' || type === 'textarea') {
      rest.inputType = type;
      type = InputCompat;
    }

    // Compat for visibility events.
    if (isFunction(onAppear) || isFunction(onDisappear)) {
      // Using React.createElement to instantiate the [VisibilityChange] element.
      return createElement(
        VisibilityChange,
        {
          onAppear,
          onDisappear,
        },
        factory(type, rest, ...args),
      );
    } else {
      return factory(type, rest, ...args);
    }
  };
}
