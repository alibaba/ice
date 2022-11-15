import './index.scss';
import { useAppData, useConfig, useData, Link, useSearchParams, history, defineDataLoader } from 'ice';
import json from '../test.json';
import url from './ice.png';

export default function Home() {
  console.log('process.env', process.env.ICE_APP_ID);
  const appData = useAppData();
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ Home ~ appData', appData);
  const config = useConfig();
  console.log('🚀 ~ file: index.tsx ~ line 8 ~ Home ~ config', config);
  const data = useData();
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Home ~ data', data);
  console.log('json', json);
  const [params] = useSearchParams();
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ Home ~ params', params);
  // @ts-ignore
  console.log('ASSETS_VERSION', ASSETS_VERSION);
  function onClick() {
    console.log('123');
  }
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
  };
}

export const dataLoader = defineDataLoader((options) => {
  // options comes from onLoad in miniapp page config
  console.log('index page options.pathname', options.pathname);
  console.log('index page options.query', options.query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Index',
      });
    }, 1 * 100);
  });
});
