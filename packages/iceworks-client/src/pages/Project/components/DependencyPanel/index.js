import React from 'react';
import Panel from '../Panel';
import stores from '../../stores';

const Dependencies = () => {
  const dependencies = stores.useStore('dependencies');
  const { dataSource } = dependencies;

  return (
    <Panel header={<h3>依赖管理</h3>}>
      <div>
        <ul>
          {dataSource.map(({ package: _package }) => {
            return <li>{_package}</li>;
          })}
        </ul>
      </div>
    </Panel>
  );
};

export default Dependencies;
