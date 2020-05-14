import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{textAlign: 'center'}}>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
      <strong>{count}</strong>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Counter;
