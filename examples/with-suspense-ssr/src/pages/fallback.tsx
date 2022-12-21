import { Suspense, Link } from 'ice';
import * as CommentsWithFallback from '@/components/WithFallback';
import * as Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Suspense module={CommentsWithFallback} />
      <Suspense module={Footer} />
      <Link to="/blog">link to blog</Link>
    </div>
  );
}