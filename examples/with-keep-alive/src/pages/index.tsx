import { useEffect } from 'react';
import { useActive, Link } from 'ice';
import Count from '@/components/Count';

export default function Home() {
  const active = useActive();

  useEffect(() => {
    if (active) {
      console.log('Page Index is actived');
    } else {
      console.log('Page Index is deactived');
    }
  }, [active]);

  return (
    <div>
      <h4>Index</h4>
      <Count />
      <Link to="/home">Home</Link>
    </div>
  );
}
