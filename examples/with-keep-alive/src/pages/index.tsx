import { Link } from 'ice';
import Counter from '@/components/Counter';

export default function Home() {
  return (
    <main>
      <h2>Home</h2>
      <Counter />
      <Link to="/about">About</Link>
    </main>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}
