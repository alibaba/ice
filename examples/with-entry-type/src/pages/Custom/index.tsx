import { Link, useData } from 'ice';

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
