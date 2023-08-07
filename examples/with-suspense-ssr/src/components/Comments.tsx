import { useSuspenseData, withSuspense } from 'ice';

function Comments() {
  const comments = useSuspenseData(getData);

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

export default withSuspense(Comments);

const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

async function getData(ctx) {
  console.log(ctx);
  console.log('load comments');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 3000);
  });

  return fakeData;
}
