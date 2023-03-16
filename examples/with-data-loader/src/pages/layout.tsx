
import { Outlet, defineDataLoader, useData } from 'ice';

const Layout = () => {
  const data = useData();
  return (
    <>
      <div id="layout-timestamp">{data}</div>
      <Outlet />
    </>
  );
};

export default Layout;

export const dataLoader = defineDataLoader(() => {
  console.log('Loading data for Layout');
  return new Date().getTime();
});