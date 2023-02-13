import { Link, useData, useConfig, definePageConfig } from 'ice';
import { isWeb } from '@uni/env';


console.log('isWeb', isWeb);
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

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Blog',
  };
});