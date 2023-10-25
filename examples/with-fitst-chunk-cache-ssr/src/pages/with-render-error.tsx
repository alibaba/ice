import { withSuspense, useSuspenseData } from 'ice';
import Footer from '@/components/List';

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

const SuspenseComments = withSuspense(Comments);

function Comments() {
  const comments = useSuspenseData(getCommentsData);

  console.log('Render: Comments');

  if (process.env.ICE_CORE_SSR === 'true') {
    throw new Error('Comments Render Error');
  }

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

export function Loading() {
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
