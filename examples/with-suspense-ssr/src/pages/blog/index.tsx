import { useData, Link } from 'ice';

export default function Blog() {
  const comments = useData();

  console.log('Render: Blog Index');

  return (
    <>
      <h2>Comments</h2>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
      <p>more pages:</p>
      <ul>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/normal">normal</Link>
        </li>
      </ul>
    </>
  );
}

const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

export const serverDataLoader = () => {
  console.log('Call serverDataLoader for: Blog Index');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 5000);
  });
};

export const dataLoader = () => {
  console.log('Call clientDataLoader for: Blog Index');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 5000);
  });
};

export function Loading() {
  return (
    <div>loading...</div>
  );
}

export const suspense = true;