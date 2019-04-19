/* eslint arrow-parens:0, function-paren-newline: 0 */
import React from 'react';
import { Button } from '@alifd/next';
import useMaterial from '@hooks/useMaterial';

const Material = () => {
  const { data, onChange } = useMaterial();
  return (
    <div onClick={onChange}>
      <h2>Material Page</h2>
      <Button type="primary">Click Me</Button>
      {data.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

export default Material;
