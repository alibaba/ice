import { Outlet, useData } from 'ice';

export default function Layout() {
  const data = useData();

  return (
    <div>
      <h2>{data.title}</h2>
      <p>This demo is artificially slowed down.</p>
      <p>Notice how HTML for comments "streams in" before the JS (or React) has loaded on the page.</p>
      <Outlet />
    </div>
  );
}

const fakeData = {
  title: 'Hello world!',
};

export const serverDataLoader = () => {
  console.log('call dataLoader in server side.');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export const dataLoader = () => {
  console.log('call dataLoader in client side.');

  return new Promise<any>((resolve) => {
    setTimeout(() => resolve(fakeData), 2000);
  });
};

export function Loading() {
  return (
    <div>loading...</div>
  );
}

export const suspense = true;