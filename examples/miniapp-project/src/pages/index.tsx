import './index.scss';
import { useAppData, useConfig, useData, Link, useSearchParams, history } from 'ice';
import json from '../test.json';
import url from './ice.png';

export default function Home() {
  const appData = useAppData();
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ Home ~ appData', appData);
  const config = useConfig();
  console.log('🚀 ~ file: index.tsx ~ line 8 ~ Home ~ config', config);
  const data = useData();
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Home ~ data', data);
  console.log('json', json);
  const [params] = useSearchParams();
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ Home ~ params', params);
  return (
    <>
      <view className="title" onClick={() => { console.log(123123); }}>Home Page</view>
      <view className="data">
        <view>foo: </view>
        <view>users:</view>
        <view>userInfo: </view>
        {/* @ts-ignore */}
        <image src="https://v3.ice.work/img/logo.png" />
        {/* @ts-ignore */}
        <image src={url} />
        <Link to="/?hello=world">222</Link>
        <view onClick={() => { history.push('/?hello=computer'); }}>点我跳转</view>
        <div>嘻嘻，我是 div 标签</div>
      </view>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
  };
}

export function getData(options) {
  // options comes from onLoad in miniapp page config
  console.log('options', options);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}
