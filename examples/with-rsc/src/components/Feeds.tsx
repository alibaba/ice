export default async function Feeds() {
  console.log('Render: Feeds');

  const data = await getData('http://localhost:4000/getData');

  // const appContext = useAppContext();
  // console.log(appContext);

  return (
    <div>
      {/* @ts-ignore */}
      {data.map(data => data.name)}
    </div>
  );
}

export async function getData(url: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'feeds' },
      ]);
    }, 1 * 2000);
  });
}