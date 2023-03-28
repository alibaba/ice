import * as ReactDOM from 'react-dom/client';
import type { RuntimePlugin } from '@ice/runtime/types';
import type { LifecycleOptions } from '../types';

const runtime: RuntimePlugin<LifecycleOptions> = ({ setRender }, runtimeOptions) => {
  if (runtimeOptions?.container) {
    setRender((_, element) => {
      // Replace render root when app rendered as a child app.
      const root = ReactDOM.createRoot(runtimeOptions.container);
      root.render(element);
      return root;
    });
  }
};

export default runtime;
