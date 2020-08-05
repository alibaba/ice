import React, { useState } from 'react';
import { usePageShow } from 'ice';

import AddButton from '@/components/add-button';
import logo from '@/public/logo.svg';
import styles from './index.module.scss';

const Todos = (props) => {
  const { history } = props;

  // state
  const [userInfo, setUserInfo] = useState({});
  const [toDos, setToDos] = useState([
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ]);

  // handlers
  const addToDo = () => {
    history.push('/add-todo');
  };

  const onToDoChange = (text) => {
    const changedToDos = toDos.map(toDo => {
      const completed = toDo.completed;
      return {
        ...toDo,
        completed: text === toDo.text ? !completed : completed
      };
    });
    setToDos(changedToDos);
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
          toDos
        }
      });
    } else {
      setToDos(data.toDos);
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
            toDos.map(toDo => (
              <view
                className={`${styles['todo-item']} ${toDo.completed ? styles.checked : ''}`}
                onClick={() => onToDoChange(toDo.text)}
                key={toDo.text}>
                <checkbox className={styles['todo-item-checkbox']} checked={toDo.completed} />
                <text className={styles['todo-item-text']}>{toDo.text}</text>
              </view>
            ))
          }
        </view>
      </view>

      <view className={styles['todo-footer']}>
        <AddButton text="Add ToDo" onClickMe={addToDo} />
      </view>
    </view>
  );
};

export default Todos;
