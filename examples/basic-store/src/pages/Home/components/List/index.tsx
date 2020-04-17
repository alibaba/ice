import React from 'react';
import model from 'ice/Home/components/List/model';

const List = () => {
  console.log('List Component:', model.useValue());

  return (
    <>
      <p>List</p>
    </>
  );
};

export default List;
