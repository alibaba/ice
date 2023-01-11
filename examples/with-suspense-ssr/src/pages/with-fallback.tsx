import { Suspense, useSuspenseData } from 'ice';
import Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Suspense id="comments" loading={<Loading />} fallback={<Fallback />}>
        <Comments />
      </Suspense>
      <Footer />
    </div>
  );
}

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
    setTimeout(() => resolve(null), 5000);
  });

  return fakeData;
}

function Fallback() {
  return (
    <h1 id="fallback">Something went wrong.</h1>
  );
}