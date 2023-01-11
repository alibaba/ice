import { useSuspenseData, Suspense } from 'ice';

export default function SuspenseFooter() {
  return (
    <Suspense id="footer" loading={<Loading />}>
      <Footer />
    </Suspense>
  );
}

function Footer() {
  const data = useSuspenseData(getData);

  console.log('Render: Footer');

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
}

function Loading() {
  return (
    <div>loading...</div>
  );
}

const fakeData = {
  title: 'Thanks for reading!',
};

async function getData() {
  console.log('load footer');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 2000);
  });

  return fakeData;
}