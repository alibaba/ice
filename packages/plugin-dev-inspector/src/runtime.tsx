import * as React from 'react';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development'
  ? Inspector
  : React.Fragment;

export default ({ addProvider }) => {
  const InspectorProvider = ({ children }) => {
    return <InspectorWrapper>{children}</InspectorWrapper>;
  };
  addProvider(InspectorProvider);
};
