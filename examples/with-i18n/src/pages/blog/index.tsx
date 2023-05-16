import { Link } from 'ice';

export default function Blog() {
  return (
    <>
      <h2>Blog</h2>
      <ul>
        <li><Link to="/">Index</Link></li>
        <li><Link to="/blog/a">Blog A</Link></li>
      </ul>
    </>
  );
}
