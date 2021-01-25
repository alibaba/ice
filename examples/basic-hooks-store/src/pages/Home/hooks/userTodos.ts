import { useState } from 'react';

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  function refresh() {
    setTodos([
      { title: 'Leaning icejs' },
      { title: 'go to school' }
    ]);
  };

  return [
    todos,
    refresh,
  ];
};
