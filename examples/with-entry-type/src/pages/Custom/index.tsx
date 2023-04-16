import { Link, useData, defineDataLoader } from 'ice';

export default function Custom() {
  const data = useData();

  return (
    <>
      <h2>Custom Page</h2>
      <Link to="/home">home</Link>
      {data}
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Custom',
  };
}

export const dataLoader = defineDataLoader({
    key: 'List_list_prefetch_key',
    prefetch_type: 'mtop',
    api: 'mtop.xxx.xx.xx.xx',
    v: '2.0',
    data: {
      id: 12345,
      params: '{"refId":"${queryParams.refId}", "namespace":1, "searchTags":true }',
    },
    prefetchKey: 'List_list_prefetch_key',
  });