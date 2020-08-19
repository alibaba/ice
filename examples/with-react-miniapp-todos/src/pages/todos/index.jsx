import React, { useState } from 'react';
import { usePageShow } from 'ice';

import AddButton from '@/components/add-button';
import logo from '@/public/logo.svg';
import styles from './index.module.scss';

const Todos = () => {
  // state
  const [userInfo, setUserInfo] = useState({});
  const [todos, setTodos] = useState([
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 小程序', completed: false },
  ]);

  // handlers
  const addTodo = () => {
    // eslint-disable-next-line
    wx.redirectTo({
      url: '/pages/add-todo/index'
    });
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

  const getUserInfo = async () => {
    // eslint-disable-next-line
    const storedUserInfo = wx.getStorageSync('userInfo');
    if (storedUserInfo === '') {
      // eslint-disable-next-line
      const res = await wx.getUserInfo();

      setUserInfo(res.userInfo);

      // eslint-disable-next-line
      wx.setStorageSync('userInfo', res.userInfo);
    }
  };

  // lifecyle function
  usePageShow(async () => {
    // eslint-disable-next-line
    const storedUserInfo = wx.getStorageSync('userInfo');
    if (userInfo !== '') {
      setUserInfo(storedUserInfo);
    }

    const storageKey = 'todos';
    // eslint-disable-next-line
    const data = wx.getStorageSync(storageKey);

    if (data === '') {
      // eslint-disable-next-line
      wx.setStorageSync(storageKey, {todos});
    } else {
      setTodos(data.todos);
    }
  });

  return (
    <view className={styles['page-todos']}>
      <view className={styles.user}>
        <button type='button' open-type="getUserInfo" onClick={getUserInfo} className={styles['login-button']} >
          <view style={{display: 'flex', flexDirection: 'column'}}>
            <image className={styles.avatar} src={userInfo.avatarUrl ? userInfo.avatarUrl : logo} alt="用户头像" />
            <text className={styles.nickname}>{userInfo.nickName ? `${userInfo.nickName}'s` : 'My' } Todo List</text>
          </view>
        </button>
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
