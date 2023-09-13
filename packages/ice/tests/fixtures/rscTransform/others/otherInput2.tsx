// 'use client';
import { useState } from 'react';
export default function Counter({ children }) {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  return (
    <button type="button" onClick={updateCount}>
      👍🏻 {count}
      {children}
    </button>
  );
}