import url from '../ice.png';
import json from './test.json';

export default function Third() {
  console.log('[Third] get json', json);
  return (
    <>
      <view className="title">Third Page</view>
      <div>我是 div 标签</div>
      <span>我是 span 标签</span>
      <img src={url} />
    </>
  );
}

