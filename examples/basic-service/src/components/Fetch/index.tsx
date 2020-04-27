import * as React from 'react';
import todoService from '@/services/todo';

const Fetch = () => {
  async function handleRequest() {
    const data = await todoService.getAll();
    console.log('getAllResult', data);
  }

  return (
    <div>
      <button type="button" onClick={handleRequest}>
        请求数据
      </button>
    </div>
  );
};

export default Fetch;
