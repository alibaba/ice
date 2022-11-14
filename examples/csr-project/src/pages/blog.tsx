import { Link, useData, useConfig, definePageConfig } from 'ice';

interface Data {
  name: string;
}

export default function Blog() {
  const data = useData<Data>();
  const config = useConfig();

  console.log('render Blog', 'data', data, 'config', config);

  return (
    <>
      <h2>Blog Page</h2>
      <Link to="/">home</Link>
    </>
  );
}

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Blog',
    auth: ['guest'],
  };
});
