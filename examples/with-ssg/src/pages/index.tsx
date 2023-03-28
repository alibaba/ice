import { useData, defineDataLoader, defineStaticDataLoader, useAppData } from 'ice';
import { useState } from 'react';

export default function Home() {
  const data = useData();
  const appData = useAppData();

  return (
    <>
      <h2>With SSG</h2>
      <Counter />
      <div>id: {appData.id}</div>
      <div>price: <span className="price">{data.price}</span></div>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  return (
    <button type="button" onClick={updateCount}>
      👍🏻 {count}
    </button>
  );
}

export const dataLoader = defineDataLoader(() => {
  return {
    price: 99.99,
  };
});

export const staticDataLoader = defineStaticDataLoader(() => {
  return {
    price: '0.00',
  };
});