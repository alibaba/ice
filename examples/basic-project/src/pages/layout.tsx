import { Outlet, useData, useConfig } from 'ice';

export default function Layout() {
  const data = useData();
  const config = useConfig();

  console.log('render Layout', 'data', data, 'config', config);

  return (
    <div>
      <h1>ICE 3.0 Layout</h1>
      <Outlet />
    </div>
  );
}

export function getConfig() {
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
}

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        layout: true,
      });
    }, 1 * 100);
  });
}
