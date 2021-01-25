import { useState } from 'react';
import delay from '@/delay';

interface Todo {
  title: string;
}

export default function useTodoList() {
  const [todoList, setTodoList] = useState([] as Todo[]);

  async function refresh() {
    await delay(2000);
    setTodoList([
      { title: 'learn ICE' },
      { title: 'go to school' }
    ]);
  };

  return [
    todoList,
    refresh,
  ];
};
