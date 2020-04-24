import * as React from 'react';
import localService from './service';

const User = () => {
  async function handleGetTodo() {
    const data = await localService.getTodo({ id: '1' });
    console.log('getTodo-data', data);
    console.log({...localService.getTodo});
  }

  async function handleGetUser() {
    const data = await localService.getUser({ id: '1' });
    console.log('getUser-data', data);
    console.log({...localService.getUser});
  }

  return (
    <div>
      <button type="button" onClick={handleGetTodo}>
        获取单个任务
      </button>
      <button type="button" onClick={handleGetUser}>
        获取用户
      </button>
    </div>
  );
};

export default User;
