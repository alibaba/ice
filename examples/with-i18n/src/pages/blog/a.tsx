import { Link } from 'ice';

export default function BlogA() {
  return (
    <>
      <h2>Blog A</h2>
      <ul>
        <li><Link to="/">Index</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </>
  );
}
