import { Link } from 'ice';
import pageStore from './store';
import appStore from '@/store';

function Home() {
  const [userState] = appStore.useModel('user');
  const [countState, countDispatcher] = pageStore.useModel('counter');
  return (
    <>
      <div id="username">
        name: {userState.name}
      </div>
      <div>
        <button type="button" id="inc" onClick={() => countDispatcher.inc()}>+</button>
        <span id="count">{countState.count}</span>
        <button type="button" id="dec" onClick={() => countDispatcher.dec()}>-</button>
      </div>
      <Link to="/blog">Blog</Link>
    </>
  );
}


export default Home;
