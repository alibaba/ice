import * as React from 'react';
import { useRequest } from 'ice';
import todoService from '@/services/todo';

const Fetch = () => {
  const { request, response, loading, error } = useRequest(todoService.getAll);

  async function handleRequest() {
    const data = await todoService.getAll();
    console.log('getAllResult', data);
  }

  React.useEffect(() => {
    request();
  // eslint-disable-next-line
  }, []);

  console.log(response, loading, error);

  return (
    <div>
      <button type="button" onClick={handleRequest}>
        获取任务列表
      </button>
    </div>
  );
};

export default Fetch;
