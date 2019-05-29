import React from 'react';
import { Loading } from '@alifd/next';
import Panel from '../Panel';

const FallbackPanel = () => {
  return (
    <Panel header={<h3>Loading Error</h3>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Loading tip="Loading..." />
      </div>
    </Panel>
  );
};

export default FallbackPanel;
