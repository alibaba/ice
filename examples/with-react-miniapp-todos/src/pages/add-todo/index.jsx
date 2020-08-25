import React, { useState } from 'react';

import todosService from '@/services/todos';
import storageService from '@/services/storage';

import AddButton from '@/components/add-button';
import styles from './index.module.scss';

const AddTodo = () => {
  // state
  const [value, setValue] = useState('');

  // handlers
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const add = async () => {
    const curTodos = await storageService.todos.get();

    const openId = await storageService.openId.get();
    console.log(openId);
    const res = await todosService.add({
      openId,
      content: {
        text: value,
        completed: false
      }
    });

    const { todo } = res.data;

    const newTodos = curTodos.concat(todo);
    storageService.todos.set(newTodos);

    // eslint-disable-next-line
    wx.redirectTo({
      url: '/pages/todos/index'
    });
  };


  return (
    <view className={styles['page-add-todo']}>
      <view className={styles['add-todo']}>
        <input
          className={styles['add-todo-input']}
          placeholder="What needs to be done?"
          value={value}
          onChange={() => {}}
          onInput={onChange} />
      </view>

      <view className={styles['todo-footer']}>
        <AddButton text="Add Todo" onClickMe={add}/>
      </view>
    </view>
  );
};

export default AddTodo;
