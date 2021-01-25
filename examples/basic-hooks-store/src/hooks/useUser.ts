import { useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState({
    name: '',
  });

  function login() {
    const dataSource = { name: 'Alvin', };
    setUser(prevState => ({
      ...prevState,
      ...dataSource
    }));
  };

  return [
    user,
    login,
  ];
};
