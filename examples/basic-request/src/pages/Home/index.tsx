import React, { useEffect } from 'react';
import { useRequest, request } from 'ice';

// 1. request in outside
request('/user').then(res => console.log('request in outside:', res));

const Home = () => {
  // 2. useRequest hook
  const { data, loading, request: fetchRepo } = useRequest({ url: '/repo' });

  useEffect(() => {
    fetchRepo();

    // 3. requse.get alias
    request.get('/user').then(res => console.log('get:', res));

    // 4. requse.post alias
    request.post('/users/123').then(res => console.log('post:', res));

    // 5. requse.delete alias
    request.delete('/user/123').then(res => console.log('delete:', res));

    // 6. request method
    request({ url: '/user'}).then((res) => {console.log('request:', res);});
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>data fetching with icejs</h2>

      {
        loading ?
          <div>loading...</div> :
          <>
            <div><strong>repo name：</strong>{data && data.name}</div>
            <div><strong>repo url：</strong>{data && data.url}</div>
          </>
      }
    </div>
  );
};

export default Home;
