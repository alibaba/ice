import { definePageConfig, Link } from 'ice';

export default function Blog() {
  return (
    <>
      <h1>Blog</h1>
      <Link to="/">Index</Link>
    </>
  );
}

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Blog',
    auth: ['guest'],
  };
});
