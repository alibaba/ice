import { useSuspenseData } from './IceSuspense';

export default function Comments() {
  const comments = useSuspenseData();

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
  console.log('serverDataLoader');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 5000);
  });
};

export const dataLoader = () => {
  console.log('clientDataLoader');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 5000);
  });
};

export const suspense = true;
export const routerId = 'comments';