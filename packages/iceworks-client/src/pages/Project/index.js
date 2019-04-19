import React from 'react';
import useMaterial from '@hooks/useMaterial';
import { changeText } from '@models/todos';

const Project = () => {
  const { data: { todos } } = useMaterial([], changeText);
  return (
    <div>
      <h2>Project Page</h2>
      {todos.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

export default Project;
