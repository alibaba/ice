import React, { useEffect } from 'react';

const Child = () => {
  function getData() {
    throw new Error('Child Error');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Child
    </div>
  );
};

export default Child;
