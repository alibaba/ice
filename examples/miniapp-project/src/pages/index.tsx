import './index.scss';
import { useState } from 'react';
import { useAppData, useConfig, useData, Link, useSearchParams, history, defineDataLoader } from 'ice';
import json from '../test.json';
import url from './ice.png';

export default function Home() {
  console.log('我是 home 页面');
  // console.log('process.env', process.env.ICE_APP_ID);
  // const appData = useAppData();
  // console.log('🚀 ~ file: index.tsx ~ line 6 ~ Home ~ appData', appData);
  // const config = useConfig();
  // console.log('🚀 ~ file: index.tsx ~ line 8 ~ Home ~ config', config);
  // const data = useData();
  // console.log('🚀 ~ file: index.tsx ~ line 10 ~ Home ~ data', data);
  // console.log('json', json);
  // const [params] = useSearchParams();
  // console.log('🚀 ~ file: index.tsx ~ line 15 ~ Home ~ params', params);
  // // @ts-ignore
  // console.log('ASSETS_VERSION', ASSETS_VERSION);
  const [count, setCount] = useState(0);
  window.addEventListener('onLoad', () => {
    console.log('yes, page onload in index page');
  });

  window.addEventListener('onShareAppMessage', () => {
    console.log('yes, page onshow in index page');
    return {
      title: '123',
      path: 'pages/index',
    };
  });

  window.addEventListener('onReady', () => {
    console.log('yes, page onready in index page');
  });

  function onClick() {
    console.log('123');
  }
  return (
    <>
      <view className="title" onClick={() => { console.log(123123); }}>Home Page</view>
      <view className="data">
        <view>{count}</view>
        <view onClick={() => setCount(count + 1)}>点我 ++ count</view>
        <view>foo: </view>
        <view>users:</view>
        <view>userInfo: </view>
        {/* @ts-ignore */}
        <image src="https://v3.ice.work/img/logo.png" />
        {/* @ts-ignore */}
        <image src={url} />
        <view onClick={() => { history.push('/?hello=computer'); }}>history 跳转本页</view>
        <view onClick={() => { history.push('/about?hello=computer'); }}>history 跳转 about 页</view>
        <view onClick={() => { history.push('/second/profile?hello=computer'); }}>history 跳转 second/profile 页</view>
        <view onClick={() => { history.push('/third'); }}>history 跳转 third/index 页</view>
        <view onClick={() => { history.push('/third/test'); }}>history 跳转 third/test 页</view>
        <Link to="/?hello=world">Link 标签跳转本页</Link>
        <Link to="/about">Link 标签跳转 about 页</Link>
        <Link to="/third">Link 标签跳转 third/index 页</Link>
        <Link to="/third/test">Link 标签跳转 third/test 页</Link>
        <div onClick={onClick}>嘻嘻，我是 div 标签</div>
        <view onClick={onClick}>嘻嘻，我是 view 标签</view>
      </view>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
    nativeEvents: [
      // 生命周期事件默认添加
      // 页面事件需要注册
      'onShareAppMessage',
    ],
  };
}

// export const dataLoader = defineDataLoader((options) => {
//   // options comes from onLoad in miniapp page config
//   // console.log('index page options.pathname', options.pathname);
//   // console.log('index page options.query', options.query);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: 'Index',
//       });
//     }, 1 * 100);
//   });
// });
