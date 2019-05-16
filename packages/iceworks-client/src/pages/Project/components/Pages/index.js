import React from 'react';
import stores from '../../stores';

const Page = () => {
  const pages = stores.useStore('pages');
  const { dataSource } = pages;

  return (
    <div>
      <h3>Pages</h3>
      <div>
        <ul>
          {dataSource.map(({ name }) => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
