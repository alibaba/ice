import { useData } from 'ice';
import './main.css';

export default function Normal() {
  const data = useData();

  console.log(data);

  return (
    <div>
      <h2>{data.title}</h2>
      <p>This demo is without suspense.</p>
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
