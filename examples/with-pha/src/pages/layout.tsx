import { Outlet, defineDataLoader } from 'ice';

export default () => {
  return (
    <div>
      <h1>ICE 3.0 Layout</h1>
      <Outlet />
    </div>
  );
};

export function pageConfig() {
  return {
    title: 'Layout',
    meta: [
      {
        name: 'layout-color',
        content: '#f00',
      },
    ],
  };
}

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        layout: true,
      });
    }, 1 * 100);
  });
});
