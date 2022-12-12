import { useData } from 'ice';

export default function Comments() {
  const comments = useData();

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

export const serverDataLoader = () => {
  console.log('Call serverDataLoader for: Comments');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 8000);
  });
};

export const dataLoader = () => {
  console.log('Call clientDataLoader for: Comments');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 5000);
  });
};

export const id = 'comments';