import React from 'react';
import useMaterial from '@hooks/useMaterial';

const Project = () => {
  const { data: { todos } } = useMaterial();
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
