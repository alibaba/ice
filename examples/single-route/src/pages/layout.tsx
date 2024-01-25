import { Outlet, defineDataLoader, useData } from 'ice';

export default function Layout() {
  const data = useData();
  console.log('layout data', data);
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
}

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'layout',
      });
    }, 1 * 100);
  });
});

