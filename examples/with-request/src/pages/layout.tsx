import { Outlet, defineDataLoader, useData, request } from 'ice';

export default () => {
  const data = useData();
  console.log(data);

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

export const dataLoader = defineDataLoader(async () => {
  try {
    const data = await request('/data');
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
});
