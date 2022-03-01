import * as React from 'react';
import type { RenderApp } from '@ice/types/esm/runtime.js';

const renderRouter: RenderApp = ({ renderComponent, routeManifest }) => {
  if (routeManifest) {
    return function AppRouter() {
      return <div>Router</div>;
    };
  }

  if (renderComponent) {
    return renderComponent;
  }

  return () => <>Error: No routes and no app.renderComponent</>;
};

export default renderRouter;