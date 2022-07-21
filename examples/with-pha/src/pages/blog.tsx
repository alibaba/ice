import { Link, useData, useConfig } from 'ice';

export default function Blog() {
  const data = useData();
  const config = useConfig();

  console.log('render Blog', 'data', data, 'config', config);

  return (
    <>
      <h2>Blog Page</h2>
      <Link to="/home">home</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Blog',
  };
}