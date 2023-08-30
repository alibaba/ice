import { Link, definePageConfig } from 'ice';


export default function Blog() {
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
