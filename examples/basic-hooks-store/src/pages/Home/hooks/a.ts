import { useState } from 'react';
import delay from '@/delay';

export default function useUser() {
  const [title, setTitle] = useState('PageA');

  async function sayHello() {
    await delay(1000);
    setTitle('Hello PageA');
  };

  return [
    title,
    sayHello
  ];
};
