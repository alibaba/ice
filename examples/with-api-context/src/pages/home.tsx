import { definePageConfig, defineAPIContext } from 'ice';

export default function Home() {
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Home',
  };
});

export const apiContext = defineAPIContext(() => {
  return [
    {
      api: 'StorageAPI.getItem',
      params: {
        key: 'itemKey',
      },
    },
    {
      api: 'PositionAPI.getCity',
      params: {},
    },
  ];
});

