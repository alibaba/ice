import React, { useEffect, useState } from 'react';
import { request } from 'ice';
// import { useRequest } from 'ice';
// import { getRepo } from '../../apis/lambda';

export default function Dashboard() {
  const [text, setText] = useState('');
  // const { data, request } = useRequest(() => getRepo());

  // useEffect(() => {
  //   request();
  // }, []);
  // console.log('data: ', data);

  useEffect(() => {
    request('/hello').then((res) => {
      setText(res)
    })
  }, []);
  return (
    <div>
      <h2>Dashboard page</h2>
      <div>/hello Response: {text}</div>
      {/* <div>method: {data?.method}</div>
      <div>name: {data?.dataSource[0].name}</div> */}
    </div>
  );
}
