import React from 'react';
import { useParams } from 'ice';

export default () => {
  const { id } = useParams();

  return (
    <h2>About {id}</h2>
  );
};
