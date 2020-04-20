import React, { useEffect } from 'react';

const Child = () => {
  function getData() {
    throw new Error('test Error');
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
