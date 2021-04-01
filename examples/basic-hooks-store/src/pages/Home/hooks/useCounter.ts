import { useState } from 'react';
import delay from '@/delay';

export default function useCounter() {
  const [count, setcount] = useState(1);

  async function plusOne() {
    await delay(1000);
    setcount(() => (count + 1));
  };

  return [
    count,
    plusOne
  ];
};
