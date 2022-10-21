import { Link, useData, useConfig, defineGetConfig } from 'ice';

export default function Blog() {
  const data = useData();
  const config = useConfig();

  console.log('render Blog', 'data', data, 'config', config);

  return (
    <>
      <h2>Blog Page</h2>
      <Link to="/">home</Link>
    </>
  );
}

export const getConfig = defineGetConfig(() => {
  return {
    title: 'Blog',
    auth: ['guest'],
  };
});