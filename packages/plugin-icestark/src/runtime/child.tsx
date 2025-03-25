import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type { RuntimePlugin } from '@ice/runtime/types';
import type { LifecycleOptions } from '../types';
import { FrameworkContext } from './Context.js';

const runtime: RuntimePlugin<LifecycleOptions> = ({ setRender }, runtimeOptions) => {
  if (runtimeOptions?.container) {
    setRender((_, element) => {
      // Replace render root when app rendered as a child app.
      const root = ReactDOM.createRoot(runtimeOptions.container);
      root.render(
        <FrameworkContext.Provider value={{ ...(runtimeOptions.customProps || {}) }}>
          {element}
        </FrameworkContext.Provider>,
      );
      return root;
    });
  }
};

export default runtime;
