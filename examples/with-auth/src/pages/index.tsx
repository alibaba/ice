import { Link, useAuth, defineGetConfig } from 'ice';
import CustomAuth from '@/components/CustomAuth';

export default function Index() {
  const [, setAuth] = useAuth();
  return (
    <>
      <ul style={{ listStyleType: 'none' }}>
        <li><Link to="blog">Blog</Link></li>
      </ul>
      <h1>Index</h1>
      <CustomAuth authKey={'guest'} fallback={<><div onClick={() => setAuth({ guest: true })}>Set Guest Auth</div>No Auth</>}>
        I am ice.js. My auth is guest.
      </CustomAuth>
    </>
  );
}

export const getConfig = defineGetConfig(() => {
  return {
    title: 'Index',
    auth: ['admin'],
  };
});
