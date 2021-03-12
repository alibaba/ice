import { useState } from 'react';
import delay from '@/delay';

export default function useUser() {
  const [title, setTitle] = useState('PageB');

  async function sayHello() {
    await delay(1000);
    setTitle('Hello PageB');
  };

  return [
    title,
    sayHello
  ];
};
