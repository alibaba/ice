import { defineDataLoader } from 'ice';
export default function Home() {
  window.addEventListener('onLoad', () => {
    console.log('yes, page onload in about page');
  });

  window.addEventListener('onShow', () => {
    console.log('yes, page onshow in about page');
  });

  window.addEventListener('onReady', () => {
    console.log('yes, page onready in about page');
  });
  return (
    <>
      <view className="title">About</view>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'About',
  };
}

export const dataLoader = defineDataLoader((options) => {
  // options comes from onLoad in miniapp page config
  console.log('about page options.pathname', options.pathname);
  console.log('about page options.query', options.query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
});
