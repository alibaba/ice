import { Component } from 'react';
import { withSuspense, useSuspenseData } from 'ice';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <SuspenseComments id="comments" fallback={<Loading />} />
      <Footer />
    </div>
  );
}

const SuspenseComments = withSuspense(() => (
  <ErrorBoundary>
    <Comments />
  </ErrorBoundary>
));

function Comments() {
  const comments = useSuspenseData(getCommentsData);

  console.log('Render: Comments');

  throw new Error('Comments Render Error');

  return (
    <div>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div>loading...</div>
  );
}

const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

async function getCommentsData() {
  console.log('load comments');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 100);
  });

  return fakeData;
}

type EProps = {
  children: ReactNode;
};

type EState = {
  hasError: boolean;
};

// ErrorBoundary will only work in client side.
class ErrorBoundary extends Component<EProps, EState> {
  state: EState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 id="fallback">Something went wrong.</h1>;
    }

    return this.props.children;
  }
}