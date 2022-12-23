import { Link, useData, useConfig, defineDataLoader } from 'ice';

export default function Test() {
  const data = useData();
  const config = useConfig();

  console.log('render Test', 'data', data, 'config', config);

  return (
    <>
      <h2>Test Page</h2>
      <Link to="/home">home</Link>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Test',
  };
}

export const dataLoader = defineDataLoader({
    key: 'List_list_prefetch_key',
    prefetch_type: 'mtop',
    api: 'mtop.taobao.social.feed.aggregate',
    v: '2.0',
    data: {
      pageId: 24501,
      env: 1,
      bizVersion: 0,
      params: '{"refId":"${queryParams.refId}", "namespace":1, "searchTags":true }',
    },
    prefetchKey: 'List_list_prefetch_key',
  } as any);