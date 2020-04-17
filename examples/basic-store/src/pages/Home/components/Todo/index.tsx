import React from 'react';
import model from 'ice/Home/components/Todo/model';

const Todo = () => {
  console.log('Todo Component:', model.useValue());

  return (
    <>
      <p>Todo</p>
    </>
  );
};

export default Todo;
