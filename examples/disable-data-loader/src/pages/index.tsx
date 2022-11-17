import { defineDataLoader } from 'ice';

export default function Home() {
  return (
    <>
      <h2 className="title">Home Page</h2>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
    meta: [
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'title-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export const dataLoader = defineDataLoader(({ pathname, query }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
        count: 100,
        pathname,
        query,
      });
    }, 1 * 100);
  });
});
