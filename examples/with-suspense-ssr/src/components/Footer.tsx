import { useSuspenseData, withSuspense } from 'ice';

function Footer() {
  const data = useSuspenseData(getData);

  console.log('Render: Footer');

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
}

export default withSuspense(Footer);

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