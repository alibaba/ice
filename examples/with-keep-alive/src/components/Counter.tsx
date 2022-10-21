import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      count: {count}
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  );
}
