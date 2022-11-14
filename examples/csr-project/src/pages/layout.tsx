import { Outlet, useData, useConfig, definePageConfig, defineDataLoader } from 'ice';

export default () => {
  const data = useData();
  const config = useConfig();

  console.log('render Layout', 'data', data, 'config', config);

  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Layout',
    meta: [
      {
        name: 'layout-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
});

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        layout: true,
      });
    }, 1 * 100);
  });
});
