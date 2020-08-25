import React, { useState } from 'react';
import { usePageShow } from 'ice';
import request from 'universal-request';

import todosService from '@/services/todos';
import storageService from '@/services/storage';

import AddButton from '@/components/add-button';
import logo from '@/public/logo.svg';
import styles from './index.module.scss';

async function login () {
  // eslint-disable-next-line
  const res = await wx.login();
  const { code } = res;
  
  const loginRes = await request({
    url: 'http://localhost:7001/api/mp/auth/login',
    method: 'POST',
    data: {
      code
    }
  });
  const { openId } = loginRes.data.data;
  await storageService.openId.set(openId);
}

const Todos = () => {
  // state
  const [userInfo, setUserInfo] = useState({});
  const [todos, setTodos] = useState([]);

  // handlers
  const addTodo = async () => {
    // eslint-disable-next-line
    wx.redirectTo({
      url: '/pages/add-todo/index'
    });
  };

  const onTodoChange = async id => {
    let changedContent = {};
    const changedTodos = todos.map(todo => {
      const { id: curId } = todo;
      const { completed } = todo.content;
      if (id === curId) {
        changedContent = {
          ...todo.content,
          completed: id === curId ? !completed : completed
        };
      }

      return {
        ...todo,
        content: {
          ...todo.content,
          completed: id === curId ? !completed : completed
        }
      };
    });

    setTodos(changedTodos);
    await storageService.todos.set(changedTodos);
    const openId = await storageService.openId.get();
    await todosService.edit(id, {
      content: changedContent,
      openId
    });
  };

  async function delTodo (id) {
    const changedTodos = todos.filter(todo => {
      const { id: curId } = todo;
      return id !== curId;
    });

    setTodos(changedTodos);
    await storageService.todos.set(changedTodos);
    await todosService.del(id);
  }

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

  const initTodos = async () => {
    const openId = await storageService.openId.get();
    const syncedTodos = await todosService.list({ openId });
    const storedTodos = await storageService.todos.get();

    const mergedTodos = syncedTodos || storedTodos || [];

    console.log(storedTodos, syncedTodos, mergedTodos);

    setTodos(mergedTodos);

    await storageService.todos.set(mergedTodos);
  };

  // lifecyle function
  usePageShow(async () => {
    console.log('page show');

    const openId = await storageService.openId.get();
    if (!openId) {
      await login();
    }
    await initTodos();

    // eslint-disable-next-line
    const storedUserInfo = wx.getStorageSync('userInfo');
    if (userInfo !== '') {
      setUserInfo(storedUserInfo);
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
            <view style={{position: 'relative'}} key={todo.id}>
              <view
                className={`${styles['todo-item']} ${todo.content.completed ? styles.checked : ''}`}
                onClick={() => onTodoChange(todo.id)}
                >
                <checkbox className={styles['todo-item-checkbox']} checked={todo.content.completed} />
                <text className={styles['todo-item-text']}>{todo.content.text}</text>
              </view>
              <view
                className={styles['close-wrapper']}
                onClick={() => delTodo(todo.id)}>
                <view className={styles.close}/>
              </view>
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
