import React, { useEffect } from 'react';
import stores from '@stores';

const Material = () => {
  const materials = stores.useStroe('materials');

  const handleClick = () => {
  };

  useEffect(() => {
    materials.refresh();
  }, []);

  return (
    <div onClick={handleClick}>
      <h2>Material</h2>
      <p>
        {materials.dataSource.map(({ name }) => {
          return name;
        })}
      </p>
    </div>
  );
};

export default Material;
