import { Outlet } from 'ice';

export default function Layout() {
  console.log('render layout');

  return (
    <>
      <h2>With SSG</h2>
      <Outlet />
    </>
  );
}