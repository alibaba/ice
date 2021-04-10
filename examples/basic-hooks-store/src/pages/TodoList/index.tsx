import React, { useEffect}  from 'react';
import store from '@/store';
import pageStore from '@/pages/TodoList/store';

export default function () {
  const [user, login] = store.useHooks('useUser');
  const [todoList, refresh] = pageStore.useHooks('useTodoList');
  const { name } = user;

  useEffect(function() {
    login();
    refresh();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        {name}, these are your todo list:
      </div>
      <ul>
        {todoList.map(({ title }) => {
          return (
            <li>
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
