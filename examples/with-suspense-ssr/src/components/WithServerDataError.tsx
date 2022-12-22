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

export const serverDataLoader = async () => {
  console.log('Call serverDataLoader for: Comments');

  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      reject('get data error');
      // resolve(fakeData);
    }, 100);
  });
};

export const dataLoader = () => {
  console.log('Call clientDataLoader for: Comments');

  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(fakeData);
    }, 100);
  });
};