import React, { useEffect } from 'react';
import { useModel } from '@store';

const Material = () => {
  const [materials] = useModel('materials');
  const { state } = materials;

  const handleClick = () => {
  };

  useEffect(() => {
    (async () => {
      await materials.init();
    })();
  }, []);

  return (
    <div onClick={handleClick}>
      <h2>Material</h2>
      <p>
        {state.dataSource.map(({ name }) => {
          return name;
        })}
      </p>
    </div>
  );
};

export default Material;
