import React from 'react';
import Panel from '../Panel';
import stores from '../../stores';

const Page = () => {
  const pages = stores.useStore('pages');
  const { dataSource } = pages;

  return (
    <Panel header={<h3>Pages</h3>}>
      <div>
        <ul>
          {dataSource.map(({ name }) => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </div>
    </Panel>
  );
};

export default Page;
