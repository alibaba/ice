import React from 'react';
import Panel from '../Panel';
import stores from '../../stores';

const Layout = () => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  return (
    <Panel header={<h3>布局列表</h3>}>
      <div>
        {dataSource.map(({ name }) => {
          return (
            <div>
              {name}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

export default Layout;
