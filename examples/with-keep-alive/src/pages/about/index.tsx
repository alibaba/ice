import { Link } from 'ice';
import Counter from '@/components/Counter';

export default function About() {
  return (
    <>
      <h3>About</h3>
      <Counter />
      <Link to="/">Home</Link>
      <br />
      <Link to="/about/me">About Me</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'About',
  };
}
