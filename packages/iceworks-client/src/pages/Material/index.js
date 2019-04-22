import React from 'react';
import { useMaterial } from '@models/material';

const Material = () => {
  const [data, fetchData] = useMaterial();

  const handleClick = () => {
    fetchData();
  };

  return (
    <div onClick={handleClick}>
      <h2>Material</h2>
      <p>{data && data.name}</p>
    </div>
  );
};

export default Material;
