import React from 'react';
import Panel from '../Panel';
import stores from '../../stores';

const DependencyPanel = () => {
  const dependencies = stores.useStore('dependencies');
  const { dataSource } = dependencies;

  return (
    <Panel header={<h3>依赖管理</h3>}>
      <div>
        <ul>
          {dataSource.map(({ package: _package }, index) => {
            return <li key={index}>{_package}</li>;
          })}
        </ul>
      </div>
    </Panel>
  );
};

export default DependencyPanel;
