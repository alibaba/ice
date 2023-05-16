import './index.scss';
import { useAppData, useData, defineDataLoader, history, Link } from 'ice';

export default function Index() {
  const appData = useAppData();
  const data = useData();
  console.log('[Index] use app data', appData);
  console.log('[Index] use data', data);
  return (
    <>
      {/* @ts-ignore */}
      <image mode="aspectFit" src="https://v3.ice.work/img/logo.png" />
      <view className="data">
        <view>Index Page</view>
        <view onClick={() => { history.push('/second?name=chris'); }}>history 跳转 second 页面</view>
        <view onClick={() => { history.push('/third'); }}>history 跳转 third/index 页面</view>
        <Link to="/fourth">Link 标签跳转 fourth 页面</Link>
      </view>
    </>
  );
}

export const dataLoader = defineDataLoader((options) => {
  // options comes from onLoad in miniapp page config
  console.log('[Index] data loader options', options);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Index',
      });
    }, 1 * 100);
  });
});
