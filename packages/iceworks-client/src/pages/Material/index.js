import React, { useEffect } from 'react';
import { useModel } from '@store';

const Material = () => {
  const [state, materials] = useModel('materials');

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
