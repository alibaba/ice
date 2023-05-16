declare const ASSETS_VERSION: string;

export default function Fourth() {
  console.log('[Fourth] ASSETS_VERSION', ASSETS_VERSION);
  return (
    <>
      <view>Fourth Page</view>
      <button>我是 button 组件</button>
      {/* @ts-ignore */}
      <progress percent={50}>我是 progress 组件</progress>
      <switch type={'switch'}>我是 switch 组件</switch>
    </>
  );
}

