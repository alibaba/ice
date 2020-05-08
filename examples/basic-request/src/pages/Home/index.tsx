import React, { useEffect } from 'react';
import { request, useRequest } from 'ice';
import service from './service';

const BuiltInRequestDemo1 = () => {
  console.clear();

  async function fetchUser1() {
    const data = await request({url: '/user' });
    console.log('直接调用 request：', data);
  }

  async function fetchUser2() {
    const data = await request({url: '/user', withFullResponse: true });
    console.log('调用 request + withFullResponse：', data);
  }

  const { request: fetchUser3, ...rest } = useRequest({url: '/user'});
  console.log('直接调用 useRequest:', {...rest});

  return (
    <>
      <h4>内置 request 演示</h4>
      <button type='button' onClick={fetchUser1}>直接调用 request</button>
      <button type='button' onClick={fetchUser2}>调用 request + withFullResponse</button>
      <button type='button' onClick={fetchUser3}>直接调用 useRequest</button>
    </>
  )
}

const BuiltInRequestDemo2 = () => {
  console.clear();
  const { request: fetchUser2, ...rest2 } = useRequest(service.getUser);
  console.log('通过 Service + useRequest 调用:', {...rest2});

  return (
    <button type='button' onClick={fetchUser2}>通过 Service + useRequest 调用</button>
  )
}

const CustomRequestDemo = () => {
  console.clear();
  const { data, loading, request: fetchRepo } = useRequest(service.getRepo);
  console.log('自定义请求进行调用:', data);
  useEffect(() => {
    fetchRepo();
  }, [fetchRepo]);

  return (
    <div>
      <h4>自定义请求演示</h4>
      <button type='button' onClick={fetchRepo}>自定义请求进行调用</button>
      {
        loading ?
          <div>loading...</div> :
          <div>
            <div><strong>repo name：</strong>{data && data.name}</div>
            <div><strong>repo url：</strong>{data && data.url}</div>
          </div>
      }
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <h2>data fetching with icejs</h2>
      <small>请打开控制台进行调试</small>
      <BuiltInRequestDemo1 />
      <BuiltInRequestDemo2 />
      <CustomRequestDemo />
    </div>
  );
};

export default Home;
