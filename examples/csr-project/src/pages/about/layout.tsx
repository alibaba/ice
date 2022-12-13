import { Outlet, defineDataLoader, useData } from 'ice';

const AboutLayout = () => {
  const data = useData();
  return (
    <>
      <div>layout data: {JSON.stringify(data)}</div>
      <Outlet />
    </>
  );
};

export default AboutLayout;

export const dataLoader = defineDataLoader(() => {
  console.log('fetching data before rendering layout of /about');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `${Math.random()}framework-layout`,
      });
    }, 1 * 100);
  });
});