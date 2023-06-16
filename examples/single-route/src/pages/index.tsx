import { Link, useData, defineDataLoader, useSuspenseData, withSuspense } from 'ice';

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
const StreamingComments = withSuspense(Comments);
const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

async function getData() {
  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 1000);
  });
  return fakeData;
}

console.log('process.env.ICE_CORE_ROUTER', process.env.ICE_CORE_ROUTER);
console.log('Link', Link);

export default function Home() {
  const data = useData();
  console.log('render About', 'data', data);
  return (
    <div>
      <h1>{data?.name}</h1>
      <h2>Home Page</h2>
      <StreamingComments id="comments" fallback={<div>loading</div>} />
    </div>
  );
}

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'home',
      });
    }, 1 * 100);
  });
});
