import * as React from 'react';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development'
  ? Inspector
  : React.Fragment;

export default ({ addProvider, appConfig }) => {
  const { devInspector = {} } = appConfig;
  const InspectorProvider = ({ children }) => {
    return <InspectorWrapper {...devInspector}>{children}</InspectorWrapper>;
  };
  addProvider(InspectorProvider);
};
