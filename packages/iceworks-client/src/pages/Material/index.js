/* eslint arrow-parens:0, function-paren-newline: 0 */
import React from 'react';
import { Button } from '@alifd/next';
import useMaterial from '@hooks/useMaterial';
import { changeText } from '@models/todos';

console.log(changeText);

const Material = () => {
  const { data: { todos }, onChange } = useMaterial([], changeText('Use hooks'));
  return (
    <div onClick={onChange}>
      <h2>Material Page</h2>
      <Button type="primary">Click Me</Button>
      {todos.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

export default Material;
