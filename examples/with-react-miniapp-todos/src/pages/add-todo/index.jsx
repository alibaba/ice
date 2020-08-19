import React, { useState } from 'react';

import AddButton from '@/components/add-button';
import styles from './index.module.scss';

const AddTodo = () => {
  // state
  const [value, setValue] = useState('');

  // handlers
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const add = () => {
    const storageKey = 'todos';

    // eslint-disable-next-line
    const data = wx.getStorageSync(storageKey);

    data.todos.push({
      text: value,
      completed: false
    });
    
    // eslint-disable-next-line 
    wx.setStorageSync(storageKey, data);

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
