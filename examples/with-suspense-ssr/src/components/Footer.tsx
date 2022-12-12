import { useData } from 'ice';

export default function Footer() {
  const data = useData();

  console.log('Render: Footer');

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
}

export function Loading() {
  return (
    <div>loading...</div>
  );
}

const fakeData = {
  title: 'Thanks for reading!',
};

export const serverDataLoader = () => {
  console.log('Call serverDataLoader for: Footer');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export const dataLoader = () => {
  console.log('Call clientDataLoader for: Footer');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export const id = 'footer';