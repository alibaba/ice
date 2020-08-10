import React, { useState } from 'react';
import { usePageShow } from 'ice';

import AddButton from '@/components/add-button';
import logo from '@/public/logo.svg';
import styles from './index.module.scss';

const Todos = (props) => {
  const { history } = props;

  // state
  const [userInfo, setUserInfo] = useState({});
  const [todos, setTodos] = useState([
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 小程序', completed: false },
  ]);

  // handlers
  const addTodo = () => {
    history.push('/add-todo');
  };

  const onTodoChange = (text) => {
    const changedTodos = todos.map(todo => {
      const completed = todo.completed;
      return {
        ...todo,
        completed: text === todo.text ? !completed : completed
      };
    });
    setTodos(changedTodos);
  };

  // lifecyle function
  usePageShow(async () => {
    // my is global variable in mini program
    // eslint-disable-next-line
    const myUserInfo = await my.getUserInfo();
    setUserInfo(myUserInfo);
    console.log('userInfo:', myUserInfo);

    // eslint-disable-next-line
    const { data } = my.getStorageSync({
      key: 'todos'
    });

    if (data === null) {
      // eslint-disable-next-line
      my.setStorageSync({
        key: 'todos',
        data: {
          todos
        }
      });
    } else {
      setTodos(data.todos);
    }
  });

  return (
    <view className={styles['page-todos']}>
      <view className={styles.user}>
        <image className={styles.avatar} src={userInfo.avatar ? logo : logo} alt="用户头像" />
        <text className={styles.nickname}>{userInfo.nickName ? `${userInfo.nickName}'s` : 'My' } Todo List</text>
      </view>
      
      <view className={styles['todo-items']}>
        <view className={styles['todo-items-group']}>
          {
            todos.map(todo => (
              <view
                className={`${styles['todo-item']} ${todo.completed ? styles.checked : ''}`}
                onClick={() => onTodoChange(todo.text)}
                key={todo.text}>
                <checkbox className={styles['todo-item-checkbox']} checked={todo.completed} />
                <text className={styles['todo-item-text']}>{todo.text}</text>
              </view>
            ))
          }
        </view>
      </view>

      <view className={styles['todo-footer']}>
        <AddButton text="Add Todo" onClickMe={addTodo} />
      </view>
    </view>
  );
};

export default Todos;
