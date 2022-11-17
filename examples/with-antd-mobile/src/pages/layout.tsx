import { Outlet } from 'ice';
import { StoreProvider } from '@/store';

export default () => {
  return (
    <StoreProvider>
      <h1>Layout</h1>
      <Outlet />
    </StoreProvider>
  );
};
