import { Outlet, useConfig } from 'ice';

export default () => {
  const config = useConfig();
  return (
    <div>
      <h1>Layout</h1>
      <h3>{config.title}</h3>
      <Outlet />
    </div>
  );
};

export function pageConfig() {
  return {
    title: 'Hash Router Demo',
  };
}
