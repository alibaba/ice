import { Suspense, Link } from 'ice';
import * as CommentsWithServerRenderError from '@/components/WithServerRenderError';
import * as Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Suspense module={CommentsWithServerRenderError} />
      <Suspense module={Footer} />
      <Link to="/blog">link to blog</Link>
    </div>
  );
}