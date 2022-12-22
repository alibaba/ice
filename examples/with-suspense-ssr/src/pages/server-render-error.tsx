import { Suspense, Link } from 'ice';
import * as CommentsWithServerRenderError from '@/components/WithServerRenderError';
import * as Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Suspense module={CommentsWithServerRenderError} id="comments" />
      <Suspense module={Footer} id="footer" />
      <Link to="/blog">link to blog</Link>
    </div>
  );
}