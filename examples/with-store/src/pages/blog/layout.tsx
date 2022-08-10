import { Outlet } from 'ice';
import store from './store';

function layout() {
  const [infoState] = store.useModel('info');
  return (
    <>
      <h1>{infoState.title}</h1>
      <Outlet />
    </>
  );
}

export default layout;