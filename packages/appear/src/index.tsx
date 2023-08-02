import type * as React from 'react';
import WebAppear from './web';
import WeexAppear from './weex';
import type { AppearProps } from './typings.js';

let Appear: React.ForwardRefExoticComponent<AppearProps & React.RefAttributes<any>>;

if (import.meta.target === 'weex') {
  Appear = WeexAppear;
} else {
  Appear = WebAppear as any;
}

export default Appear;
