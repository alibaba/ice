import { Link } from 'ice';

export default function About() {
  return (
    <>
      <h3>About Me</h3>
      <input />
      <br />
      <Link to="/about">About</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'About Me',
  };
}
