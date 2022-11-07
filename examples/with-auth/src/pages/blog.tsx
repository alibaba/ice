import { defineGetConfig, Link } from 'ice';

export default function Blog() {
  return (
    <>
      <h1>Blog</h1>
      <Link to="/">Index</Link>
    </>
  );
}

export const getConfig = defineGetConfig(() => {
  return {
    title: 'Blog',
    auth: ['guest'],
  };
});
