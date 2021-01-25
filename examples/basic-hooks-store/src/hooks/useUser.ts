import { useState } from 'react';
import delay from '@/delay';

export default function useUser() {
  const [user, setUser] = useState({
    name: 'unknown',
  });

  async function login() {
    await delay(1000);
    setUser({ name: 'Alvin' });
  };

  return [
    user,
    login,
  ];
};
