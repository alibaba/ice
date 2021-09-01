import { useEffect } from 'react';
import { useRequest } from 'ice';
import { getRepo } from '../../apis/lambda';

export default function Dashboard() {
  const { data, loading, request } = useRequest(() => getRepo());

  useEffect(() => {
    request();
  }, []);
  console.log('data: ', data);
  return (
    <div>
      <h2>Dashboard page</h2>
    </div>
  );
}
