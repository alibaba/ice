import React from 'react';
import stores from '../../stores';

const Page = () => {
  const dependencies = stores.useStore('dependencies');
  const { dataSource } = dependencies;

  return (
    <div>
      <h3>Dependencies</h3>
      <div>
        <ul>
          {dataSource.map(({ package: _package }) => {
            return <li>{_package}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
