import { Link } from 'ice';

console.log('process.env.ICE_CORE_ROUTER', process.env.ICE_CORE_ROUTER);
console.log('Link', Link);

export default function Home() {
  return <div>home <h2>Home Page</h2></div>;
}