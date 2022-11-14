import { Outlet } from 'ice';

export default () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};

export function pageConfig() {
  return {
    title: 'Hash Router Demo',
  };
}
