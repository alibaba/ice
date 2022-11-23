import { useSuspenseData } from './IceSuspense';

export default function Footer() {
  const data = useSuspenseData();

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
  console.log('serverDataLoader');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export const dataLoader = () => {
  console.log('clientDataLoader');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export const suspense = true;
export const routerId = 'footer';