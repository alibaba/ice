import { Link } from 'ice';
import Count from '@/components/Count';

export default function Home() {
  return (
    <div>
      <h4>Home</h4>
      <Count />
      <Link to="/">Index</Link>
    </div>
  );
}
