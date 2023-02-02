import { useState } from 'react';

export default function About() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>About: {count}</h2>
      <div onClick={() => { setCount(count + 1); }}>+add</div>
    </div>
  );
}