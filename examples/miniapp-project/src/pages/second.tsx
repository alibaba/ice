// import './index.scss';
import { useState } from 'react';
import { useConfig, useSearchParams, usePageLifecycle } from 'ice';

export default function Second() {
  const config = useConfig();
  console.log('[Second] use config', config);
  const [params] = useSearchParams();
  console.log('[Second] use search params', params);
  const [count, setCount] = useState(0);

  usePageLifecycle('onLoad', (options) => {
    console.log('[Second] page onLoad', options);
  });
  usePageLifecycle('onReady', () => {
    console.log('[Second] page onReady');
  });
  usePageLifecycle('onShow', () => {
    console.log('[Second] page onShow');
  });
  usePageLifecycle('onHide', () => {
    console.log('[Second] page onHide');
  });
  usePageLifecycle('onShareAppMessage', (options) => {
    console.log('[Second] onShareAppMessage', options);
    return {
      title: '123',
      path: 'pages/index',
    };
  });
  usePageLifecycle('onShareTimeline', (options) => {
    console.log('[Second] onShareTimeline', options);
    return {
      title: '456',
    };
  });

  return (<view>
    <view>Second Page</view>
    <view>{count}</view>
    <view onClick={() => { setCount(count + 1); }}>+</view>
  </view>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
    nativeEvents: [
      'onShareAppMessage',
      'onShareTimeline',
    ],
  };
}
