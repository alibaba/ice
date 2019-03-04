import React from 'react';

export interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return (
    <div style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>
      Hello, {name}
    </div>
  );
};

export default Greeting;
