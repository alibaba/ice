import React, { useState } from 'react';

import AddButton from '@/components/add-button';
import styles from './index.module.scss';

const AddTodo = (props) => {
  const { history } = props;

  // state
  const [value, setValue] = useState('');

  // handlers
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const add = () => {
    const storageKey = 'todos';

    // eslint-disable-next-line
    const { data } = my.getStorageSync({
      key: storageKey
    });

    if (data !== null) {
      data.todos.push({
        text: value,
        completed: false
      });
    }
    
    // eslint-disable-next-line 
    my.setStorageSync({
      key: storageKey,
      data: {
        todos: data.todos
      }
    });
    
    history.push('/todos');
  };


  return (
    <view className={styles['page-add-todo']}>
      <view className={styles['add-todo']}>
        <input
          className={styles['add-todo-input']}
          placeholder="What needs to be done?"
          value={value}
          onChange={onChange} />
      </view>

      <view className={styles['todo-footer']}>
        <AddButton text="Add Todo" onClickMe={add}/>
      </view>
    </view>
  );
};

export default AddTodo;
