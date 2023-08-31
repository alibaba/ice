import { Outlet } from 'ice';

export default function Layout() {
  console.log('Render: Layout');

  return (
    <div>
      <h1>Suspense App</h1>
      <Outlet />
    </div>
  );
}