import { useSuspenseData, Suspense } from 'ice';

export default function SuspenseComments() {
  return (
    <Suspense id="comments" loading={<Loading />}>
      <Comments />
    </Suspense>
  );
}

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
    setTimeout(() => resolve(null), 3000);
  });

  return fakeData;
}