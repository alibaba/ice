
import * as ReactDOM from 'react-dom/client';
import type { RuntimePlugin } from '@ice/runtime/esm/types';

interface RuntimeOptions {
  container: Element;
  customProps?: Record<string, any>;
}

const runtime: RuntimePlugin<RuntimeOptions> = ({ setRender }, runtimeOptions) => {
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