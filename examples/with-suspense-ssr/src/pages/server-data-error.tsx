import { Suspense, Link } from 'ice';
import * as CommentsWithServerDataError from '@/components/WithServerDataError';
import * as Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Suspense module={CommentsWithServerDataError} id="comments" />
      <Suspense module={Footer} id="footer" />
      <Link to="/blog">link to blog</Link>
    </div>
  );
}