import { withSuspense, useSuspenseData } from 'ice';
import Footer from '@/components/List';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <SuspenseComments id="comments" fallback={<Loading />} />
      <Footer id="footer" />
    </div>
  );
}

const SuspenseComments = withSuspense(Comments);

function Comments() {
  const comments = useSuspenseData(getCommentsData);

  console.log('Render: Comments');

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

async function getCommentsData(ctx) {
  console.log('load comments');

  if (process.env.ICE_CORE_SSR === 'true') {
    await new Promise<any>((resolve, reject) => {
      setTimeout(() => reject('get data error'), 100);
    });
  } else {
    console.log('client ctx', ctx);
    await new Promise<any>((resolve) => {
      setTimeout(() => resolve(null), 100);
    });
  }

  return fakeData;
}
