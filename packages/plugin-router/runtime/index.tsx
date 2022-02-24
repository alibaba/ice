import * as React from 'react';
import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = ({ setRenderApp }) => {
  setRenderApp(({ renderComponent }) => {
    return renderComponent || (() => <>empty content</>);
  });
};

export default runtime;
